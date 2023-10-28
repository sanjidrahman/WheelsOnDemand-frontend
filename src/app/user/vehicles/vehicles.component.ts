import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { vehicleState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment.development';

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
  private subscribe = new Subscription();

  constructor(
    private store: Store<vehicleState>,
    private _activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = sixMonthsFromNow.toISOString().split('T')[0];

    this._activatedroute.queryParams.subscribe((p) => {
      this.startDate = new Date(p['startDate'])
      this.endDate = new Date(p['endDate'])
      this.pickup = p['pickup']
      this.dropoff = p['dropoff']
    })

    this.formattedStartDate = this.startDate.toISOString().split('T')[0]
    this.formattedEndDate = this.endDate.toISOString().split('T')[0]

    const timeDiff = this.endDate.getTime() - this.startDate.getTime()
    this.days = timeDiff / (1000 * 3600 * 24)
  }

  addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  click() {
    console.log(this.startDate, this.endDate);
  }



  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
