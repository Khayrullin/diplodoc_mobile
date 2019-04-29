import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {UpdaterService} from '../../services/updater.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.page.html',
    styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
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

    openDetailedReport(id) {
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
        return this.router.navigate(['members', 'report'], navigationExtras);
    }

}
