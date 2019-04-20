import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

    login(email, password) {
        this.http.post('http://diplodoc.ru/api/login', {
            login: email,
            password: password
        }).subscribe((response) => {
            return this.storage.set(TOKEN_KEY, response['result']['token']).then(() => {
                this.authenticationState.next(true);
            });
        });
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
