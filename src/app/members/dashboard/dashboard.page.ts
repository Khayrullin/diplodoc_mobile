import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Storage} from '@ionic/storage';
import {UpdaterService} from '../../services/updater.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    constructor(private authService: AuthenticationService, private storage: Storage, private updService: UpdaterService) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    sendPostRequest() {
        this.updService.update();
    }
}
