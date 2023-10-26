import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/services/admin.services';

@Component({
  selector: 'app-submit-rejectvehicle',
  templateUrl: './submit-rejectvehicle.component.html',
  styleUrls: ['./submit-rejectvehicle.component.css']
})
export class SubmitRejectvehicleComponent implements OnInit{
  issueForm!: FormGroup;
  hostId!: string;

  constructor(
    private _ref: MatDialogRef<SubmitRejectvehicleComponent>,
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
    this.hostId = this._data
  }

  saveClick() {
    this._service.rejectVehicle(this.issueForm.value, this.hostId).subscribe({
      next: () => {
        this.closepopup()
        this._toastr.success('Issue submitted successfully')
      },
      error: () => {
        this._toastr.error('Something went wrong')
      }
    })
  }

  closepopup() {
    this._ref.close()
  }

}
