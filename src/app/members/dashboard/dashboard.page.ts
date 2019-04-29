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



    constructor(private authService: AuthenticationService, private router: Router, private storage: Storage,
                private updService: UpdaterService) {
    }

    ngOnInit() {
        this.update();
        this.loadItems();
    }

    // READ
    loadItems() {
        this.storage.get('data').then(items => {
            this.items = items;
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
}
