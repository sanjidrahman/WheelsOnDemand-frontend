import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrls: ['./mail-verify.component.css']
})
export class MailVerifyComponent implements OnInit, OnDestroy {

  form!: FormGroup
  private subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _service: UserService,
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
         this._router.navigate(['/login'])
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
