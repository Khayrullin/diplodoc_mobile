import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email = AbstractControl;
    password = AbstractControl;
    loginForm: FormGroup;

    constructor(private authService: AuthenticationService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required]),
        });
    }

    validation_messages = {
        'email': [
            { type: 'required', message: 'Поле E-mail обязательно для заполнения.' },
            { type: 'minlength', message: 'E-mail должен быть длиннее 3х символов' },
            { type: 'email', message: 'Некорректный E-mail ' },
        ],
        'password': [
            { type: 'required', message: 'Поле Пароль обязательно для заполнения' }
        ],
    };

    ngOnInit() {
    }

    login() {
        this.authService.login(this.loginForm.value);
    }

}
