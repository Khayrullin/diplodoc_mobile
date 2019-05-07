import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Storage} from '@ionic/storage';
import {UpdaterService} from '../../services/updater.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import * as moment from 'moment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    items: any;
    data: any;
    upd_at: any;
    ok = true;
    loading = 0;
    upd_ago: any;


    constructor(private authService: AuthenticationService, private router: Router, private storage: Storage,
                private updService: UpdaterService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.doRefresh();
        });
        this.loadItems();
        setInterval(() => {
            this.storage.get('upd_at').then(data => {
                moment.locale('ru');
                this.upd_at = moment(data).fromNow();
            });
        }, 60000);
    }

    ngOnInit() {
    }

    // READ
    loadItems() {
        this.storage.get('data').then(items => {
            this.items = items;
        });
        this.storage.get('upd_at').then(data => {
            moment.locale('ru');
            this.upd_at = moment(data).fromNow();
        });
    }

    logout() {
        this.authService.logout();
    }

    openDetailsWithState(id) {
        for (const it in this.items) {
            if (this.items[it].id === id) {
                this.data = this.items[it];
            }
        }
        console.log(this.data);
        const navigationExtras: NavigationExtras = {
            state: {
                task: this.data
            }
        };
        return this.router.navigate(['members', 'task'], navigationExtras);
    }

    update() {
        this.updService.update();
    }

     doRefresh() {
        this.update();
        this.loading = 0;
        const progressBar = setInterval(() => {
            this.loading += .25;
            if (this.loading === 1) {
                clearInterval(progressBar);
            }
        }, 500);
        setTimeout(() => {
            this.loadItems();
        }, 3000);
    }
}
