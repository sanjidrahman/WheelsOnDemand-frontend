import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HostService } from '../services/host.service';
import { IBookingModel } from 'src/app/models/booking.model';
import { vehicleState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { Subscription, map, Observable, switchMap, of } from 'rxjs';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';

@Component({
  selector: 'app-host-bookings-details',
  templateUrl: './host-bookings-details.component.html',
  styleUrls: ['./host-bookings-details.component.css']
})
export class HostBookingsDetailsComponent implements OnInit, OnDestroy {

  bookingDetails!: IBookingModel[]
  vehicleId!: string
  vehicleDetails!: IVehicleModel | undefined
  status: string[] = ['complete', 'cancel']
  statusCurr!: string
  bookingId!: string | null
  private subscribe = new Subscription()

  constructor(
    private _activatedroute: ActivatedRoute,
    private _toastr: ToastrService,
    private _router: Router,
    private _service: HostService,
  ) { }

  ngOnInit(): void {
    this.update()
  }

  update() {
    this.bookingId = this._activatedroute.snapshot.paramMap.get('b_id')
    this.subscribe.add(
      this._service.getBookDetails(this.bookingId).pipe(
        switchMap((res: any) => {
          this.bookingDetails = res;
          this.vehicleId = res[0].vehicleId._id;
          this.statusCurr = res[0].status;
          if (this.vehicleId) {
            return this._service.getVehicleDetails(this.vehicleId);
          } else {
            return of(null);
          }
        })
      ).subscribe({
        next: (vehicleDetails: any) => {
          if (vehicleDetails) {
            this.vehicleDetails = vehicleDetails;
          }
        },
        error: (err) => {
          // console.log(err);
        }
      })
    );

  }

  customClass(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'status-cancelled';
      case 'Booked':
        return 'status-booked';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  onStatusChange() {
    this.subscribe.add(
      this._service.updateBookingStatus(this.statusCurr, this.bookingId).subscribe({
        next: () => {
          this.update()
          this._toastr.success('Updated Successfully!')
        },
        error: (err) => {
          this._toastr.error(err.error.message)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
