import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-host-mail-verify',
  templateUrl: './host-mail-verify.component.html',
  styleUrl: './host-mail-verify.component.css'
})
export class HostMailVerifyComponent implements OnInit, OnDestroy{
  form!: FormGroup
  private subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _service: HostService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    const email = this.form.getRawValue()
    this.subscribe.add(
      this._service.forgotPass(email).subscribe({
        next: () => {
         this._router.navigate(['/host'])
         this._toastr.success(`An email has been sent to your email address. Please check your inbox for instructions on how to reset your password. If you don't see the email, please check your spam folder. !`)
        },
        error: (err) => {
          this._toastr.error(err.error.message) 
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
