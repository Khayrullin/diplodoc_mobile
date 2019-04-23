import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email = '';
    password = '';
    loginForm: FormGroup;

    constructor(private authService: AuthenticationService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required]),
        });

    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.loginForm.value);
    }

}
