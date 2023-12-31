import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, of, switchMap } from 'rxjs';
import { IBookingModel } from 'src/app/interfaces/booking.model';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { AdminService } from '../services/admin.services';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  styleUrls: ['./admin-booking-details.component.css']
})
export class AdminBookingDetailsComponent {

  bookingDetails!: IBookingModel
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
    private _service: AdminService,
    private _ngConfirm: NgConfirmService,
  ) { }

  ngOnInit(): void {
    this.update()
  }

  update() {
    this.bookingId = this._activatedroute.snapshot.paramMap.get('b_id')
    this.subscribe.add(
      this._service.getBookDetails(this.bookingId).pipe(
        switchMap((res) => {
          this.bookingDetails = res;
          this.vehicleId = res.vehicleId._id;
          this.statusCurr = res.status;
          if (this.vehicleId) {
            return this._service.getVehicleDetails(this.vehicleId);
          } else {
            return of(null);
          }
        })
      ).subscribe({
        next: (vehicleDetails) => {
          if (vehicleDetails) {
            this.vehicleDetails = vehicleDetails;
          }
        },
        error: (err) => {
          this._toastr.error('Something went wrong')
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
    this._ngConfirm.showConfirm(`Are sure you want to proceed Note: This action cannot be reverted !`, () => {
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
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
