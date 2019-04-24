import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Platform} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class UpdaterService {
    token = '';
    private headers: HttpHeaders;

    constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    }

    getToken(): Promise<any> {
        return this.storage.get('token');
    }

    update() {
        try {
            const c = new Promise((resolve, reject) => {
                setTimeout(() => {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            'authorization': this.token
                        })
                    };
                    this.http.get('http://diplodoc.ru/api/view', httpOptions).subscribe(
                        (response) => {
                            if (response == null) {
                                throw new Error('Empty response');
                            } else {
                                console.log(response);
                                return this.storage.set('tasks', response['result']);
                            }
                        },
                        (error: HttpErrorResponse) => {
                            if (error['status'] === 401) {
                                console.log(error);

                            }
                        }
                    );
                }, 10);
                this.storage.get('auth-token').then((val) => {
                    this.token = val;
                });
            });
        } catch (e) {
            console.log(e);

        }

    }

}
