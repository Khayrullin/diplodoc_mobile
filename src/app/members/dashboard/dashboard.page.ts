import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Storage} from '@ionic/storage';
import {UpdaterService} from '../../services/updater.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    items: any;

    constructor(private authService: AuthenticationService, private storage: Storage, private updService: UpdaterService) {
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
    upd() {
        console.log('ffff');
    }

    update() {
        this.updService.update();
    }
}
