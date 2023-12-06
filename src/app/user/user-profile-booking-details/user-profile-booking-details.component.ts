import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription, of, switchMap } from 'rxjs';
import { IBookingModel } from 'src/app/interfaces/booking.model';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancelReasonComponent } from 'src/app/popups/booking-cancel-reason/booking-cancel-reason.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-booking-details',
  templateUrl: './user-profile-booking-details.component.html',
  styleUrls: ['./user-profile-booking-details.component.css']
})
export class UserProfileBookingDetailsComponent implements OnInit {

  private subscribe = new Subscription()
  bookingDetails!: IBookingModel
  vehicleDetails!: IVehicleModel | null
  vehicleId!: string

  constructor(
    private _matdialog: MatDialog,
    private _activatedroute: ActivatedRoute,
    private _service: UserService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.update()
  }

  update() {
    const b_id = this._activatedroute.snapshot.paramMap.get('b_id')
    this.subscribe.add(
      this._service.getBookDetails(b_id).pipe(
        switchMap((res) => {     
          this.bookingDetails = res;
          this.vehicleId = res.vehicleId._id;
          if (this.vehicleId) {
            return this._service.getVehicleDetails(this.vehicleId)
          } else {
            return of(null)
          }
        })
      ).subscribe({
        next: (vehicleDetails) => {
          this.vehicleDetails = vehicleDetails
        },
        error: (err) => {
          console.log(err);
          this._toastr.error(err.error)
        }
      })
    )

    //************* */ keeping for reference /* ************
    // if(this.vehicleId)
    // this.subscribe.add(
    //   this._service.getVehicleDetails(this.vehicleId).subscribe((res) => {
    //     this.vehicleDetails = res
    //   })
    // )
  }

  openReasonDialog(bookingId: string) {
    const dialog = this._matdialog.open(BookingCancelReasonComponent, {
      data: bookingId,
      width: '50%'
    })
    dialog.afterClosed().subscribe(() => {
      this.update()
    })
  }

  isNotExpired() {
    const endDate = new Date(this.bookingDetails.endDate);
    const currentDate = new Date();
    return endDate > currentDate;
  }

getImage(file: string) {
  return `${environment.STATIC_FILE_API}${file}`
}

}
