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
    private local_reports: any;

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
                }, 2000);
                this.storage.get('auth-token').then((val) => {
                    this.token = val;
                });
                this.saveStoredReport();
            });
        } catch (e) {
            console.log(e);
        }

    }

    saveReport(value, task_id, materials) {
        try {
            const httpOptions = {
                headers: new HttpHeaders({
                    'authorization': this.token
                })
            };
            this.storage.get('local_reports').then(valueStr => {
                console.log('any');
                if (valueStr) {
                    this.local_reports = valueStr;
                    this.local_reports.push({
                        type_of_work: value.type_of_work,
                        amount: value.amount,
                        work_hours: value.work_hours,
                        task_id: task_id,
                        workman_id: value.workman,
                        materials: materials,
                        documents: value.documents
                    });
                } else {
                    this.local_reports = [{
                        type_of_work: value.type_of_work,
                        amount: value.amount,
                        work_hours: value.work_hours,
                        task_id: task_id,
                        workman_id: value.workman,
                        materials: materials,
                        documents: value.documents
                    }];
                }
                this.storage.set('local_reports', this.local_reports);
                console.log(this.local_reports);
                this.http.post('http://diplodoc.ru/api/post', {
                    data: this.local_reports
                }, httpOptions).subscribe(
                    (response) => {
                        if (response == null) {
                            throw new Error('Empty response');
                        } else {
                            console.log(response);
                            this.storage.remove('local_reports');
                            return response;
                        }
                    },
                    (error: HttpErrorResponse) => {
                        if (error['status'] === 401) {
                            console.log(error);

                        }
                    }
                );
            });
        } catch
            (e) {
            console.log(e);
            this.storage.remove('local_reports');
        }
    }

    saveStoredReport() {
        setTimeout(() => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'authorization': this.token
                })
            };
            this.storage.get('local_reports').then(valueStr => {
                if (valueStr) {
                    this.local_reports = valueStr;
                    this.http.post('http://diplodoc.ru/api/post', {
                        data: this.local_reports
                    }, httpOptions).subscribe(
                        (response) => {
                            if (response == null) {
                                throw new Error('Empty response');
                            } else {
                                console.log(response);
                                this.storage.remove('local_reports');
                                return response;
                            }
                        },
                        (error: HttpErrorResponse) => {
                            if (error['status'] === 401) {
                                console.log(error);

                            }
                        }
                    );
                }
            });
        }, 1000);
    }
}
