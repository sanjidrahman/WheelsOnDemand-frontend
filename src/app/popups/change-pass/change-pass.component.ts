import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HostService } from 'src/app/host/services/host.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  passFormChange!: FormGroup<any>
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide = true
  hidepass = true
  hideconfirm = true

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: HostService,
    private _ref: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
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
    this.passFormChange = this._fb.group({
      oldPass: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.pattern(this.StrongPasswordRegx)]],
      confirmPass: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator('password', 'confirmPass') })
  }

  onSubmit() {
    if (this.passFormChange.invalid) {
      return
    }
    this._service.changePass(this.passFormChange.value).subscribe((res) => {
      this.close()
      this._toastr.success('Password changed successfully!')
    },(err) => {
      this._toastr.error(err.error.message)
    })
  }
  close() {
   this._ref.close()
  }

}
