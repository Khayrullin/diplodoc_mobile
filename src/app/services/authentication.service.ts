import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authenticationState = new BehaviorSubject(null);

    constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            } else {
                this.authenticationState.next(false);
            }
        });
    }

    login(value) {
        try {
            this.http.post('http://diplodoc.ru/api/login', {
                login: value.email,
                password: value.password
            }).subscribe(
                (response) => {
                    if (response == null) {
                        throw new Error('Empty response');
                    } else {
                        return this.storage.set(TOKEN_KEY, response['result']['token']).then(() => {
                            this.authenticationState.next(true);
                        });
                    }
                },
                (error: HttpErrorResponse) => {
                    if (error['status'] === 401) {
                        console.log(error);

                    }
                }
            );
        } catch (e) {
            console.log(e);

        }

    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

}
