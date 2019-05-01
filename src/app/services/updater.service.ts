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
                    this.http.get('http://diplodoc.ru/api/get', httpOptions).subscribe(
                        (response) => {
                            if (response == null) {
                                throw new Error('Empty response');
                            } else {
                                console.log(response);
                                this.storage.set('upd_at', Date.now());
                                return this.storage.set('data', response['result']);
                            }
                        },
                        (error: HttpErrorResponse) => {
                            if (error['status'] === 401) {
                                console.log(error);

                            }
                        }
                    );
                }, 1000);
                this.storage.get('auth-token').then((val) => {
                    this.token = val;
                });
            });
        } catch (e) {
            console.log(e);
        }

    }

    saveReport(value, task_id) {
        try {
            const httpOptions = {
                headers: new HttpHeaders({
                    'authorization': this.token
                })
            };
            this.http.post('http://diplodoc.ru/api/post', {
                type_of_work: value.type_of_work,
                amount: value.amount,
                work_hours: value.work_hours,
                workman: value.workman,
                materials: value.materials,
                documents: value.documents,
                task_id: task_id
            }, httpOptions).subscribe(
                (response) => {
                    if (response == null) {
                        throw new Error('Empty response');
                    } else {
                        return response;
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
}
