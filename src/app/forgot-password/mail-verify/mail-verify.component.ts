import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrls: ['./mail-verify.component.css']
})
export class MailVerifyComponent implements OnInit {

  form!: FormGroup

  constructor(
    private _fb: FormBuilder,
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
  }

}
