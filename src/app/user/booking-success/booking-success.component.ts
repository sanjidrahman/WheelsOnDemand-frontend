import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment.development';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit, OnDestroy {

  booking: any
  vehicleDetails!: Observable<vehicleModel | undefined>
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
          console.log(this.booking);
        },
        error: (err) => {
          console.log(err);
        }
      })
    )

    setTimeout(() => {
      console.log(this.booking[0].startDate);
      this.startDate = this.booking[0].startDate
      this.endDate = this.booking[0].endDate
      this.pickup = this.booking[0].pickup
      this.dropoff = this.booking[0].dropoff
    }, 50);

    this._store.dispatch(retrievevehicles())
    this.vehicleDetails = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == vehicleId))
    )

  }

  ngco() {
    console.log(this.booking[0].startDate);
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
