import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HostService } from 'src/app/host/services/host.service';

@Component({
  selector: 'app-edit-host-dialog',
  templateUrl: './edit-host-dialog.component.html',
  styleUrls: ['./edit-host-dialog.component.css']
})
export class EditHostDialogComponent implements OnInit {

  hostEditForm!: FormGroup
  inputdata!: any
  phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _ref: MatDialogRef<EditHostDialogComponent>,
    private _service: HostService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit() {
    this.inputdata = this._data
    this.hostEditForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: [''],
      phone:['',[Validators.required, Validators.minLength(10) , Validators.maxLength(10)]]
    })
  }

  onSubmit() {
    if(this.hostEditForm.invalid){
      return
    }
    this._service.updatehost(this.hostEditForm.value).subscribe(() => {
      this.onCancel()
      this._toastr.success('Updated successfully')
    },(err) => {
      this._toastr.error('updation failed')
    })
  }

  onCancel() {
    this._ref.close()
  }

}
