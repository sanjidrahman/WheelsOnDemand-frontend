import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-booking-cancel-reason',
  templateUrl: './booking-cancel-reason.component.html',
  styleUrls: ['./booking-cancel-reason.component.css']
})
export class BookingCancelReasonComponent implements OnInit, OnDestroy {

  reasonForm!: FormGroup
  private subscribe = new Subscription()

  constructor(
    private _ref: MatDialogRef<BookingCancelReasonComponent>,
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private _data: string,
  ){}

  ngOnInit(): void {
    this.reasonForm = this._fb.group({
      reason: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  closepopup() {
    this._ref.close()
  }

  saveClick() {
    if(this.reasonForm.invalid) {
      return
    }
    const reason = this.reasonForm.value
    this.subscribe.add(
      this._service.cancelbooking(reason, this._data).subscribe({
        next: () => {
          this.closepopup()
          this._toastr.success('booking Cancelled')
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
