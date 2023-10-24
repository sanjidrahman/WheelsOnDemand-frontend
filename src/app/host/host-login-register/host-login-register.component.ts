import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-host-login-register',
  templateUrl: './host-login-register.component.html',
  styleUrls: ['./host-login-register.component.css']
})
export class HostLoginRegisterComponent implements OnInit {

  submit: any;
  hostRegisterForm!: FormGroup<any>;
  hostLoginForm!: FormGroup<any>;
  user: any
  loggedIn: any;

  constructor(
    private _fb: FormBuilder,
    private _service: HostService,
    private _router: Router,
    private _toastr: ToastrService,
    private _authService: SocialAuthService
  ) { }

  passwordMatchValidator(password: any, confirmPass: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const confirmPassControl = formgroup.controls[confirmPass];

      if (confirmPassControl.errors && confirmPassControl.errors['passwordMismatch']) {
        return
      }

      if (passwordcontrol.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ passwordMismatch: true })
      }
    };
  }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
      this._service.googleLogin(this.user).subscribe((res) => {
        localStorage.setItem('userToken', res.token)
        this._router.navigate([''])
      }, (err) => {
        this._toastr.error(err.error.message)
      })
    });

    this.hostLoginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.hostRegisterForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator('password', 'confirmPass')} );

  }

  onRegister() {
    if(this.hostRegisterForm.invalid){
      return
    }else{
      let hostData = this.hostRegisterForm.getRawValue()
      this._service.registerHost(hostData).subscribe(() => {
        this._router.navigate(['host/host-otp-verify'])
      })
    }
  }

  onLogin() {
    if(this.hostLoginForm.invalid){
      return
    }else{
      let logData = this.hostLoginForm.getRawValue()
      this._service.loginHost(logData).subscribe((res) => {
        this._router.navigate(['/host/h/dashboard'])
      },(err) => {
        this._toastr.error(err.error.message)
      })
    }
  }
}
