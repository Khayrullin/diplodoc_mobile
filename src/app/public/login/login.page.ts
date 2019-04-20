import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email = '';
    password = '';
  constructor(private authService: AuthenticationService) {


  }

  ngOnInit() {
  }

  login(email, password) {
    console.log(email);
    this.authService.login(email, password);
  }

}
