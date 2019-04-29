import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdaterService} from '../../services/updater.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    items: any;
    data: any;

    constructor(private storage: Storage,
                private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.items = this.router.getCurrentNavigation().extras.state.task;
            }
        });
    }

    ngOnInit() {
    }
}


