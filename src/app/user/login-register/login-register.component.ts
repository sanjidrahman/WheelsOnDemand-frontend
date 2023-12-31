import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';
import { IGoogleUserData } from '../../interfaces/google-login.interface';
import { WhiteSpace, passwordMatchValidator } from '../../validators/validators';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  registerForm!: FormGroup
  submit = false
  user!: IGoogleUserData;
  loggedIn!: boolean;
  sub!: Subscription
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide = true;
  hideConfirm = true;
  hideLogin = true;

  constructor(
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _toastr: ToastrService,
    private _authService: SocialAuthService
  ) { }

  
  ngOnInit() {
    this.sub = this._authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this._service.googleLogin(this.user).subscribe((res) => {
        localStorage.setItem('userToken', res.token)
        this._router.navigate([''])
      }, (err) => {
        // this._toastr.error(err.error.message)
      })
    });

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4), WhiteSpace]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordMatchValidator('password', 'confirmPass') });

  }

  onLogin() {
    this.submit = true
    if (this.loginForm.invalid) {
      return
    } else {
      let logUser = this.loginForm.getRawValue()
      this._service.loginUser(logUser).subscribe((res) => {
        localStorage.setItem('userToken', res.token)
        this._router.navigate([''])
      }, (err) => {
        this._toastr.error(err.error.message)
      })
    }
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return
    } else {
      let regUser = this.registerForm.value
      this._service.registerUser(regUser).subscribe((res) => {
        this._router.navigate(['/otp-verify']);
      }, (err) => {
        this._toastr.error(err.error.message)
      })
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
