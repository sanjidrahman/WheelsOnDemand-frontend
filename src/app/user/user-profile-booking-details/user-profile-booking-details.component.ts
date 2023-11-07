import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription, map } from 'rxjs';
import { bookingModel } from 'src/app/models/booking.model';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancelReasonComponent } from 'src/app/popups/booking-cancel-reason/booking-cancel-reason.component';

@Component({
  selector: 'app-user-profile-booking-details',
  templateUrl: './user-profile-booking-details.component.html',
  styleUrls: ['./user-profile-booking-details.component.css']
})
export class UserProfileBookingDetailsComponent implements OnInit, AfterViewInit {

  private subscribe = new Subscription()
  bookingDetails!: bookingModel[]
  vehicleDetails!: Observable<vehicleModel | undefined>
  vehicleId!: string

  constructor(
    private _matdialog: MatDialog,
    private _activatedroute: ActivatedRoute,
    private _service: UserService,
    private _store: Store<vehicleState>
  ){}

  ngOnInit(): void {
    this.update()
  }

  update() {
    const b_id = this._activatedroute.snapshot.paramMap.get('b_id')
    this.subscribe.add(
      this._service.getBookDetails(b_id).subscribe((res : any) => {
        this.bookingDetails = res
        this.vehicleId = res[0].vehicleId._id
      })
    )

    this._store.dispatch(retrievevehicles())
    this.vehicleDetails = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == this.vehicleId))
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
