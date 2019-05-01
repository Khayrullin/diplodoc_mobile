import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {UpdaterService} from '../../services/updater.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  materials = AbstractControl;
  documents = AbstractControl;
  reportForm: FormGroup;
  task_id: any;

  constructor(private updService: UpdaterService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.task_id = this.router.getCurrentNavigation().extras.state.task_id;
      }
    });
    this.reportForm = new FormGroup({
      type_of_work: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      workman: new FormControl(''),
      work_hours: new FormControl('', [Validators.required]),
      materials: new FormControl(''),
      documents: new FormControl('')
    });
  }

  validation_messages = {
    'type_of_work': [
      { type: 'required', message: 'Поле "Тип работы" обязательно для заполнения.' },
    ],
    'amount': [
      { type: 'required', message: 'Поле "Объем работы" обязательно для заполнения' }
    ],
    'work_hours': [
      { type: 'required', message: 'Поле "Время работы" обязательно для заполнения' }
    ],
  };

  ngOnInit() {
  }


  save() {
    console.log(this.updService.saveReport(this.reportForm.value, this.task_id));
  }

}
