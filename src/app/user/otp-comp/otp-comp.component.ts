import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-comp',
  templateUrl: './otp-comp.component.html',
  styleUrls: ['./otp-comp.component.css']
})
export class OtpCompComponent implements OnInit {

  otpVerify!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _service: UserService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.otpVerify = this._fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit() {
    if (this.otpVerify.invalid) {
      return 
    } else {
      let otp = this.otpVerify.getRawValue()
      this._service.verify(otp).subscribe((res : any) => {
        if(res.message == 'Success')
        localStorage.setItem('userToken' , res.token)
        this._router.navigate([''])
      },(err) => {
        this._toastr.error(err.error.message)
      })
    }
  }
}
