import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HostService } from '../services/host.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-host-otp-comp',
  templateUrl: './host-otp-comp.component.html',
  styleUrls: ['./host-otp-comp.component.css']
})
export class HostOtpCompComponent {
  otpVerify!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: HostService,
    private _router: Router
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
      this._service.verifyHost(otp).subscribe((res: any) => {
        if (res.message == 'Success')
          localStorage.setItem('hostToken', res.token)
        this._router.navigate(['host/host-upload'])
      }, (err) => {
        this._toastr.error(err.error.message)
      })
    }
  }
}
