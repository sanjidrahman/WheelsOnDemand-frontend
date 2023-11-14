import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription, map, of, switchMap } from 'rxjs';
import { IBookingModel } from 'src/app/models/booking.model';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancelReasonComponent } from 'src/app/popups/booking-cancel-reason/booking-cancel-reason.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-booking-details',
  templateUrl: './user-profile-booking-details.component.html',
  styleUrls: ['./user-profile-booking-details.component.css']
})
export class UserProfileBookingDetailsComponent implements OnInit, AfterViewInit {

  private subscribe = new Subscription()
  bookingDetails!: IBookingModel[]
  vehicleDetails!: IVehicleModel | undefined
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
        switchMap((res: any) => {
          this.bookingDetails = res;
          this.vehicleId = res[0].vehicleId._id;
          if (this.vehicleId) {
            return this._service.getVehicleDetails(this.vehicleId)
          } else {
            return of(null)
          }
        })
      ).subscribe({
        next: (vehicleDetails: any) => {
          this.vehicleDetails = vehicleDetails
        },
        error: (err) => {
          this._toastr.error(err.error.message)
        }
      })
    )



    this.subscribe.add(
      this._service.getVehicleDetails(this.vehicleId).subscribe((res) => {
        this.vehicleDetails = res
      })
    )
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

  ngAfterViewInit(): void {

  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

}
