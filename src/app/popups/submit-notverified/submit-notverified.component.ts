import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/services/admin.services';

@Component({
  selector: 'app-submit-notverified',
  templateUrl: './submit-notverified.component.html',
  styleUrls: ['./submit-notverified.component.css']
})
export class SubmitNotverifiedComponent implements OnInit {

  issueForm!: FormGroup
  userId!: any

  constructor(
    private _ref: MatDialogRef<SubmitNotverifiedComponent>,
    private _fb: FormBuilder,
    private _service: AdminService,
    private _router: Router,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private _data: string,
  ) { }

  ngOnInit() {
    this.issueForm = this._fb.group({
      issue: ['', [Validators.required, Validators.minLength(4)]]
    })
    this.userId = this._data
  }

  saveClick() {
    if (this.issueForm.invalid) {
      return
    } else {
      const issueSubmtted = this.issueForm.value
      console.log(this.userId.id);
      this._service.hostnotverify(this.userId.id, issueSubmtted).subscribe((res) => {
        console.log(res);
        this.closepopup()
        // this._router.navigate(['admin/land/hostlist'])
        // this._toastr.success('Issue submitted to host')
      })
    }
  }

  closepopup() {
    this._ref.close();
  }

}
