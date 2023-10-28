import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {

  minDate = new Date();
  maxDate!: Date;
  rangeSelect!: FormGroup;
  pickupLocation!: FormGroup;
  dropLocation!: FormGroup;
  isLinear = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    
  ) { }

  ngOnInit(): void {
    this.maxDate = this.addMonthsToDate(new Date(), 6)

    this.rangeSelect = this._fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

    this.pickupLocation = this._fb.group({
      pickup: ['', Validators.required]
    })

    this.dropLocation = this._fb.group({
      dropoff: ['', Validators.required]
    })

  }

  addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  submit() {
    if (this.rangeSelect.invalid && this.pickupLocation.invalid && this.dropLocation.invalid) {
      return
    } else {
      const dateDate = this.rangeSelect.getRawValue()
      const pickupData = this.pickupLocation.getRawValue()
      const dropoffData = this.dropLocation.getRawValue()
      const queryParams = {
        startDate: dateDate.startDate,
        endDate: dateDate.endDate,
        pickup: pickupData.pickup,
        dropoff: dropoffData.dropoff,
      };
      this._router.navigate(['vehicles'], { queryParams: queryParams });
    }
  }

}

