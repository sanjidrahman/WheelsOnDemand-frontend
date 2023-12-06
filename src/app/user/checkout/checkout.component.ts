import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUserModel } from 'src/app/interfaces/user.model';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { jwtDecode } from "jwt-decode";
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { IBookingId } from '../../interfaces/booking.interface';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {


  vehicleDetails!: IVehicleModel | undefined;
  userDetails!: IUserModel | undefined;
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
  subTotal!: number
  grandTotal: number = 0
  userName!: string | undefined;
  userPhone!: number | undefined;
  userEmail!: string | undefined;
  userWallet!: number | undefined
  useWallet: boolean = false;
  private subscribe = new Subscription()

  constructor(
    private _toastr: ToastrService,
    private _router: Router,
    private _service: UserService,
    private _activaterouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.v_id = this._activaterouter.snapshot.paramMap.get('id');
    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res) => {
        this.vehicleDetails = res
        this.getCurrUser()
      })
    )
  }

  getCurrUser() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.u_id = jwtDecode(token)
    }

    this._service.getUser().subscribe({
      next: (res: IUserModel) => {
        this.userDetails = res
        this.getUserDetails()
        this.checkoutDetails()
        this.fairDetails()
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }

  getUserDetails() {
    if (this.userDetails) {
      this.userChoices = this.userDetails.choices;
      this.userName = this.userDetails.name;
      this.userEmail = this.userDetails.email;
      this.userPhone = this.userDetails.phone;
      this.userWallet = this.userDetails.wallet;
    }
  }

  checkoutDetails() {
    if (this.userDetails && this.userChoices) {
      this.pickup = this.userChoices.pickup
      this.dropoff = this.userChoices.dropoff
      this.startDate = new Date(this.userChoices.startDate)
      this.endDate = new Date(this.userChoices.endDate)
      this.formattedStartDate = this.startDate.toISOString().split('T')[0]
      this.formattedEndDate = this.endDate.toISOString().split('T')[0]
      const timeDiff = this.endDate.getTime() - this.startDate.getTime()
      this.days = timeDiff / (1000 * 3600 * 24)
    }
  }

  fairDetails() {
    if (this.userChoices && this.vehicleDetails) {
      if (this.days >= 7) {
        const vprice = this.vehicleDetails.price
        const dis = (vprice * this.days) * 10 / 100
        this.v_price = (vprice * this.days) - dis
      } else {
        const vprice = this.vehicleDetails.price
        this.v_price = vprice * this.days
      }

      if (this.v_price) {
        this.sgst = Math.floor((this.v_price * 14) / 100)
        this.cgst = Math.floor((this.v_price * 14) / 100)
        this.subTotal = this.v_price + this.cgst + this.sgst
        this.grandTotal = this.v_price + this.cgst + this.sgst
      }
    }
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  onWalletSelect() {
    this.useWallet = !this.useWallet;

    if (this.useWallet) {
      if (this.userWallet) {
        this.grandTotal < this.userWallet ? this.grandTotal = 0 : this.grandTotal -= this.userWallet
      }
    } else {
      if (this.userWallet) {
        this.grandTotal < this.userWallet ? this.grandTotal = this.subTotal : this.grandTotal += this.userWallet
      }
    }
  }

  bookNow() {
    const bookingDetails = {
      vehicleId: this.v_id,
      startDate: this.startDate,
      endDate: this.endDate,
      pickup: this.pickup,
      dropoff: this.dropoff,
      total: this.subTotal,
      grandTotal: this.grandTotal,
      paymentMethod: 'wallet'
    }

    this.subscribe.add(
      this._service.bookVehicle(bookingDetails).subscribe({
        next: (res: any) => {
          console.log(res);
          this._router.navigate(['booking-success', res.bookingId, this.v_id])
          this._toastr.success('Booked Successsfully !')
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err.error.message)
        }
      })
    )
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
          color: '#ffc107',
        },
        modal: {
          ondismiss: () => {
            // console.log('dismissed');
          }
        }
      }
    }

    const paymentsuccess = (paymentid: any) => {
      // console.log(paymentid);
    }

    const paymentfailure = (err: any) => {
      // console.log(err);
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
      total: this.subTotal,
      grandTotal: this.grandTotal,
      razorId: res,
      paymentMethod: 'razor'
    }

    if (this.useWallet) bookingDetails.paymentMethod = 'razor n wallet'

    this.subscribe.add(
      this._service.bookVehicle(bookingDetails).subscribe({
        next: (res) => {
          this._router.navigate(['booking-success', res.bookingId, this.v_id])
          this._toastr.success('Booked Successsfully !')
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err)
        }
      })
    )

  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
