import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment.development';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { IBookingModel } from '../../interfaces/booking.model';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit, OnDestroy {

  booking!: IBookingModel
  vehicleDetails!: IVehicleModel | undefined
  startDate!: string;
  endDate!: string;
  dropoff!: string;
  pickup!: string;
  private subscribe = new Subscription()

  constructor(
    private _activatedroute: ActivatedRoute,
    private _service: UserService,
    private _store: Store<vehicleState>
  ){}

  ngOnInit(): void {
    const bookingId = this._activatedroute.snapshot.paramMap.get('b_id');
    const vehicleId = this._activatedroute.snapshot.paramMap.get('v_id');
    this.subscribe.add(
      this._service.getBookDetails(bookingId).subscribe({
        next: (res) => {
          this.booking = res
          this.uiDetails()
        },
        error: (err) => {
          // console.log(err);
        }
      })
    )

    this.subscribe.add(
      this._service.getVehicleDetails(vehicleId).subscribe((res) => {
        this.vehicleDetails = res
      })
    )
  }

  uiDetails() {
    if(this.booking) {
      this.startDate = this.booking.startDate
      this.endDate = this.booking.endDate
      this.pickup = this.booking.pickup
      this.dropoff = this.booking.dropoff
    }
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
