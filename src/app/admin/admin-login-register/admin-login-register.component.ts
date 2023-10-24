import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.services';

@Component({
  selector: 'app-admin-login-register',
  templateUrl: './admin-login-register.component.html',
  styleUrls: ['./admin-login-register.component.css']
})
export class AdminLoginRegisterComponent implements OnInit {


  adminLogin!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: AdminService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.adminLogin = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if(this.adminLogin.invalid){
      return
    }else{
      let data = this.adminLogin.getRawValue()
      console.log(data);
      this._service.loginUser(data).subscribe((res) => {
        console.log(res.token);
        localStorage.setItem('adminToken', res.token)
        this._router.navigate(['admin/a/dashboard'])
      },(err) => {
        this._toastr.error(err.error.message)
      })
    }
  }

}
