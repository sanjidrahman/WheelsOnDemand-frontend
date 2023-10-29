import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { userModel } from 'src/app/models/user.model';
import { userState } from 'src/app/store/state/app.state';
import jwt_decode from "jwt-decode";
import { retrieveuser } from 'src/app/store/state/app.actions';
import { getuser } from 'src/app/store/state/app.selectors';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  startDate!: Date
  endDate!: Date
  pickup!: string
  dropoff!: string
  formattedStartDate!: string
  formattedEndDate!: string
  days!: any
  minDate!: string
  maxDate!: string
  userid!: any
  userDetails!: Observable<userModel | undefined>
  userChoices: any
  isEditable: boolean = false
  private subscribe = new Subscription();

  constructor(
    private _store: Store<userState>,
    private _service: UserService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwt_decode(token)
    } 
    this._store.dispatch(retrieveuser())
    this.userDetails = this._store.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.userid.id))
    )

    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = sixMonthsFromNow.toISOString().split('T')[0];

    setTimeout(() => {
      this.userDetails.forEach((i) => {
        this.userChoices = i?.choices
      })
    },50)

    setTimeout(() => {
      this.pickup = this.userChoices.pickup
      this.dropoff = this.userChoices.dropoff
      this.startDate = new Date(this.userChoices.startDate)
      this.endDate = new Date(this.userChoices.endDate)
      this.formattedStartDate = this.startDate.toISOString().split('T')[0]
      this.formattedEndDate = this.endDate.toISOString().split('T')[0]
      const timeDiff = this.endDate.getTime() - this.startDate.getTime()
      this.days = timeDiff / (1000 * 3600 * 24)
    },100)
 
  }

  addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  edit() {
    this.isEditable = true
  }


  update() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwt_decode(token)
    } 
    this._store.dispatch(retrieveuser())
    this.userDetails = this._store.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.userid.id))
    )

    setTimeout(() => {
      this.userDetails.forEach((i) => {
        this.userChoices = i?.choices
      })
    },50)

    setTimeout(() => {
      this.pickup = this.userChoices.pickup
      this.dropoff = this.userChoices.dropoff
      this.startDate = new Date(this.userChoices.startDate)
      this.endDate = new Date(this.userChoices.endDate)
      this.formattedStartDate = this.startDate.toISOString().split('T')[0]
      this.formattedEndDate = this.endDate.toISOString().split('T')[0]
      const timeDiff = this.endDate.getTime() - this.startDate.getTime()
      this.days = timeDiff / (1000 * 3600 * 24)
    },100)
  }

  editChoice() {
    const choice = {
      startDate: this.formattedStartDate,
      endDate: this.formattedEndDate,
      pickup: this.pickup,
      dropoff: this.dropoff
    }
    console.log(choice.startDate, choice.endDate);
    this.subscribe.add(
      this._service.storeChoice(choice).subscribe({
        next: () => {
          this.update()
          this.isEditable = false
          this._toastr.success('Editted Successfully')
        },
        error: (err) => {
          this._toastr.error(err)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
