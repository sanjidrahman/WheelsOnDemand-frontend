import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  hideNewPass = true
  hideConfimPass = true
  resetPassForm!: FormGroup
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  private subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: UserService,
    private _activatedroute: ActivatedRoute,
    private _router: Router,
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
    this.resetPassForm = this._fb.group({
      newpass: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmpass: ['', Validators.required]
    }, { validators: this.passwordMatchValidator('newpass', 'confirmpass') })
  }

  onSubmit() {
    if (this.resetPassForm.invalid) {
      return
    } else {
      const newPass = this.resetPassForm.getRawValue()
      const userid = this._activatedroute.snapshot.paramMap.get('u_id')
      this.subscribe.add(
        this._service.resetPass(userid, newPass).subscribe({
          next: () => {
            this._router.navigate(['/login'])
            this._toastr.success('Password changed successfully')
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
