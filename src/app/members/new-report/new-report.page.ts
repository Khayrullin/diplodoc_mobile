import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdaterService} from '../../services/updater.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {CameraOptions} from '@ionic-native/camera/';
import {Camera} from '@ionic-native/Camera/ngx';

@Component({
    selector: 'app-new-report',
    templateUrl: './new-report.page.html',
    styleUrls: ['./new-report.page.scss'],
})
export class NewReportPage implements OnInit {
    type_of_work = AbstractControl;
    amount = AbstractControl;
    workman = AbstractControl;
    work_hours = AbstractControl;
    documents = AbstractControl;
    reportForm: FormGroup;
    task_id: any;
    workers: any;
    materials_ar: any;
    base64Image: Array<any>;

    constructor(private updService: UpdaterService, private route: ActivatedRoute,
                private router: Router, private storage: Storage, private camera: Camera) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.task_id = this.router.getCurrentNavigation().extras.state.task_id;
                this.materials_ar = this.router.getCurrentNavigation().extras.state.materials;
                this.storage.get('data').then(items => {
                    this.workers = items[0]['all_workers'];
                });
                for (const m in this.materials_ar) {
                    this.addMaterial();
                }
            }
        });
        this.reportForm = new FormGroup({
            type_of_work: new FormControl('', [Validators.required]),
            amount: new FormControl('', [Validators.required]),
            workman: new FormControl(''),
            work_hours: new FormControl('', [Validators.required]),
            materials: new FormArray([]),
            documents: new FormControl(''),
        });
    }

    validation_messages = {
        'type_of_work': [
            {type: 'required', message: 'Поле "Тип работы" обязательно для заполнения.'},
        ],
        'amount': [
            {type: 'required', message: 'Поле "Объем работы" обязательно для заполнения'}
        ],
        'work_hours': [
            {type: 'required', message: 'Поле "Время работы" обязательно для заполнения'}
        ],
    };

    ngOnInit() {
    }

    get materials() {
        return this.reportForm.get('materials') as FormArray;
    }

    addMaterial() {
        this.materials.push(new FormControl(''));
    }


    save() {
        for (const m in this.materials_ar) {
            this.materials_ar[m]['wasted'] = this.reportForm.value.materials[m];
        }
        console.log(this.updService.saveReport(this.reportForm.value, this.task_id, this.materials_ar, this.base64Image));
        this.router.navigate(['members', 'dashboard']);
    }

    openGalery() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then((imageData) => {
            if (!this.base64Image) {
                this.base64Image = [{photo: 'data:image/jpeg;base64,' + imageData, name: 'Документ'}];
            } else {
                this.base64Image.push({photo: 'data:image/jpeg;base64,' + imageData, name: 'Документ'});
            }
        }, (err) => {
            console.log(err);
        });
    }
}
