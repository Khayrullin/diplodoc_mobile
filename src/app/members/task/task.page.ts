import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

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

    logout() {
        this.authService.logout();
    }

}
