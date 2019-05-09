import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UpdaterService} from '../../services/updater.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.page.html',
    styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
    items: any;
    data: any;

    constructor(private authService: AuthenticationService, private storage: Storage,
                private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.items = this.router.getCurrentNavigation().extras.state.task;
            }
        });
    }

    ngOnInit() {
    }

    openReports() {

        this.data = this.items['reports'];
        console.log(this.data);
        const navigationExtras: NavigationExtras = {
            state: {
                task: this.data,
                task_id: this.items['id'],
                materials: this.items['materials']
            }
        };
        return this.router.navigate(['members', 'reports'], navigationExtras);
    }

}
