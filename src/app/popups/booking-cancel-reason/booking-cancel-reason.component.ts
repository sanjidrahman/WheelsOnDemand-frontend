import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { IBookingModel } from '../../models/booking.model';

@Component({
  selector: 'app-booking-cancel-reason',
  templateUrl: './booking-cancel-reason.component.html',
  styleUrls: ['./booking-cancel-reason.component.css']
})
export class BookingCancelReasonComponent implements OnInit, OnDestroy {

  reasonForm!: FormGroup
  bookingDetails!: IBookingModel[]
  refundAmount: number = 0
  refundSourceAmount: number = 0
  private subscribe = new Subscription()

  constructor(
    private _ref: MatDialogRef<BookingCancelReasonComponent>,
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private _data: string,
  ) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getBookDetails(this._data).subscribe((res: any) => {
        this.bookingDetails = res
        this.calculateRefund(this.bookingDetails[0].startDate, this.bookingDetails[0].grandTotal)
      })
    )
    this.reasonForm = this._fb.group({
      reason: ['', [Validators.required, Validators.minLength(4)]],
      refundOption: ['wallet', Validators.required]
    })
  }

  calculateRefund(bookedDate: string, bookingPrice: number): number {
    if (this.bookingDetails) {
      const parsedBookedDate = new Date(bookedDate)
      const currentDate = new Date();

      if (parsedBookedDate.toDateString() === currentDate.toDateString()) {
        return this.refundAmount = bookingPrice;
      }

      if (parsedBookedDate < currentDate) {
        return this.refundAmount;
      }
      const timeDifference = Math.abs(parsedBookedDate.getTime() - currentDate.getTime());
      const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

      if (hoursDifference >= 24) {
        return this.refundAmount = bookingPrice;
      } else if (hoursDifference >= 12) {
        return this.refundAmount = 0.5 * bookingPrice;
      } else {
        return this.refundAmount;
      }
    }
    return this.refundAmount
  }

  // calculateSourceRefund(bookedDate: string, bookingPrice: number): any {
  //   const parsedBookedDate = new Date(bookedDate);
  //   const currentDate = new Date();

  //   if (parsedBookedDate.toDateString() === currentDate.toDateString()) {
  //     const razorCharge = (bookingPrice * 2) / 100
  //     const razorTax = (razorCharge * 18) / 100
  //     this.refundSourceAmount = Math.round(bookingPrice - (razorTax + razorCharge))
  //     return this.refundAmount = this.refundSourceAmount;
  //   }

  //   if (parsedBookedDate < currentDate) {
  //     return this.refundAmount = this.refundSourceAmount;
  //   }

  //   const timeDifference = Math.abs(parsedBookedDate.getTime() - currentDate.getTime());
  //   const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

  //   if (hoursDifference >= 24) {
  //     this.refundAmount = this.refundSourceAmount;
  //   } else if (hoursDifference >= 12) {
  //     this.refundAmount = 0.5 * this.refundSourceAmount;
  //   } else {
  //     this.refundAmount = 0;
  //   }
  // }


  closepopup() {
    this._ref.close()
  }

  saveClick() {
    if (this.reasonForm.invalid) {
      return
    }
    const reason = this.reasonForm.get('reason')?.value
    const refundvia = this.reasonForm.get('refundOption')?.value

    this.subscribe.add(
      this._service.cancelbooking(reason, this._data, this.refundAmount, refundvia).subscribe({
        next: () => {
          this.closepopup()
          this._toastr.success('booking Cancelled')
        },
        error: (err) => {
          // console.log(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}


