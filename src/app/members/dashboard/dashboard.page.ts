import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Storage} from '@ionic/storage';
import {UpdaterService} from '../../services/updater.service';
import {NavigationExtras, Router} from '@angular/router';


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


    constructor(private authService: AuthenticationService, private router: Router, private storage: Storage,
                private updService: UpdaterService) {
        this.loadItems();
        this.doRefresh();
    }

    ngOnInit() {
    }

    // READ
    loadItems() {
        this.storage.get('data').then(items => {
            this.items = items;
        });
        this.storage.get('upd_at').then(data => {
            this.upd_at = data;
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
        return this.updService.update();
    }

     doRefresh() {
        this.loading = 0;
        const progressBar = setInterval(() => {
            this.loading += .25;
            if (this.loading === 1) {
                clearInterval(progressBar);
            }
        }, 500);
        setTimeout(() => {
            this.loadItems();
        }, 2000);
        return this.update();
    }
}
