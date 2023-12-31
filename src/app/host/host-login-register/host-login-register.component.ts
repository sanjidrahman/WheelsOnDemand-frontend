import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HostService } from '../services/host.service';
import { IGoogleUserData } from '../../interfaces/google-login.interface';
import { passwordMatchValidator } from '../../validators/validators';

@Component({
  selector: 'app-host-login-register',
  templateUrl: './host-login-register.component.html',
  styleUrls: ['./host-login-register.component.css']
})
export class HostLoginRegisterComponent implements OnInit {

  submit!: boolean;
  hostRegisterForm!: FormGroup;
  hostLoginForm!: FormGroup;
  user!: IGoogleUserData;
  loggedIn!: boolean;
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hideLogin: boolean = true;
  hideRegister: boolean = true;
  hideRegisterCpass: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _service: HostService,
    private _router: Router,
    private _toastr: ToastrService,
    private _authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
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
      password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordMatchValidator('password', 'confirmPass')} );

  }

  onRegister() {
    if(this.hostRegisterForm.invalid){
      return
    }else{
      let hostData = this.hostRegisterForm.getRawValue()
      this._service.registerHost(hostData).subscribe((res) => {
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
        localStorage.setItem('hostToken', res.token)
        this._router.navigate(['/host/h/dashboard'])
      },(err) => {
        this._toastr.error(err.error.message)
      })
    }
  }
}
