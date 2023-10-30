import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, map } from 'rxjs';
import { userModel } from 'src/app/models/user.model';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { retrieveuser, retrievevehicles } from 'src/app/store/state/app.actions';
import { getuser, getvehicles } from 'src/app/store/state/app.selectors';
import { userState, vehicleState } from 'src/app/store/state/app.state';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {


  vehicleDetails!: Observable<vehicleModel | undefined>;
  userDetails!: Observable<userModel | undefined>;
  u_id: any;
  v_id!: string | null;
  startDate!: Date;
  endDate!: Date;
  pickup!: string;
  dropoff!: string;
  formattedStartDate!: string;
  formattedEndDate!: string;
  days!: any;
  userChoices: any;
  v_price!: number;
  sgst!: number;
  cgst!: number;
  grandTotal!: number;
  userName!: string | undefined;
  userPhone!: number | undefined;
  userEmail!: string | undefined;
  private subscribe = new Subscription()

  constructor(
    private _vstore: Store<vehicleState>,
    private _ustore: Store<userState>,
    private _toastr: ToastrService,
    private _router: Router,
    private _service: UserService,
    private _activaterouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.v_id = this._activaterouter.snapshot.paramMap.get('id');
    this._vstore.dispatch(retrievevehicles())
    this.vehicleDetails = this._vstore.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == this.v_id))
    )

    const token = localStorage.getItem('userToken');
    if (token) {
      this.u_id = jwt_decode(token)
    }
    this._ustore.dispatch(retrieveuser())
    this.userDetails = this._ustore.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.u_id.id))
    )

    setTimeout(() => {
      this.userDetails.forEach((i) => {
        this.userChoices = i?.choices
        this.userName = i?.name
        this.userEmail = i?.email
        this.userPhone = i?.phone
      })
    }, 50)

    setTimeout(() => {
      this.pickup = this.userChoices.pickup
      this.dropoff = this.userChoices.dropoff
      this.startDate = new Date(this.userChoices.startDate)
      this.endDate = new Date(this.userChoices.endDate)
      this.formattedStartDate = this.startDate.toISOString().split('T')[0]
      this.formattedEndDate = this.endDate.toISOString().split('T')[0]
      const timeDiff = this.endDate.getTime() - this.startDate.getTime()
      this.days = timeDiff / (1000 * 3600 * 24)
    }, 100)

    setTimeout(() => {
      const startDate = new Date(this.userChoices.startDate)
      const endDate = new Date(this.userChoices.endDate)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const days = timeDiff / (1000 * 3600 * 24)
      if (days >= 7) {
        this.vehicleDetails.forEach((v) => {
          if (v) {
            const dis = (v.price * days) * 10 / 100
            this.v_price = (v.price * days) - dis
          }
        })
      } else {
        this.vehicleDetails.forEach((v) => {
          if (v) {
            this.v_price = v.price * days
          }
        })
      }

      this.sgst = Math.floor((this.v_price * 14) / 100)
      this.cgst = Math.floor((this.v_price * 14) / 100)
      this.grandTotal = this.v_price + this.cgst + this.sgst

    }, 100)
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  payNow() {
    const RazorpayOptions = {
      description: 'Sample Payment',
      currency: 'INR',
      amount: this.grandTotal * 100,
      name: 'WheelsOnDemand',
      key: environment.RAZOR_KEY,
      handler: (res: any) => {
        this.verifyPayment(res)
      },
      image: '../../../assets/images/header-logo.png',
      prefill: {
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
        theme: {
          color: '#f37354',
        },
        modal: {
          ondismiss: () => {
            console.log('dismissed');
          }
        }
      }
    }

    const paymentsuccess = (paymentid: any) => {
      console.log(paymentid);
    }

    const paymentfailure = (err: any) => {
      console.log(err);
    }

    Razorpay.open(RazorpayOptions, paymentsuccess, paymentfailure)
  }

  verifyPayment(res: any) {

    const bookingDetails = {
      vehicleId: this.v_id,
      startDate: this.startDate,
      endDate: this.endDate,
      pickup: this.pickup,
      dropoff: this.dropoff,
      total: this.v_price,
      grandTotal: this.grandTotal,
      razorId: res
    }

    this.subscribe.add(
      this._service.bookVehicle(bookingDetails).subscribe({
        next: (res: any) => {
          this._router.navigate(['booking-success', res.bookingId])
          this._toastr.success('Booked Successsfully !')
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err)
        }
      })
    )

  }

  ngOnDestroy(): void {

  }

}
