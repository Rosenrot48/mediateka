import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {AUTH_STATUS} from '../../statuses/AUTH_STATUSES';
import {CookieService} from "angular2-cookie/core";
import {UserStore} from "../../store/user.store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials = {login: null, password: null};

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private userStore: UserStore,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.cookieService.get('jwt_token')) {
      this.router.navigate(['/app'])
    }
  }

  loginUser() {
    this.credentials.login = this.loginForm.controls['username'].value;
    this.credentials.password = this.loginForm.controls['password'].value;
    this.as.loginUser(this.credentials).subscribe({
      next: value => {
        if (value.status === AUTH_STATUS.SUCCESS_AUTH) {
          this.cookieService.put('jwt_token', value.token);
          this.userStore.setUser(value.user);
          this.router.navigate(['/app'])
        }
      }
    });
  }
}
