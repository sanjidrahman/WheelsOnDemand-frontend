import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit, OnDestroy {

  minDate = new Date();
  maxDate!: Date;
  rangeSelect!: FormGroup;
  pickupLocation!: FormGroup;
  dropLocation!: FormGroup;
  statectrl!: FormControl
  isLinear = false;
  disable: boolean = true;
  sharedData!: string[] // Data from the service (dataSharingService)
  private subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: UserService,
    private _toastr: ToastrService,
    private _dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.maxDate = this.addMonthsToDate(new Date(), 6)

    this.rangeSelect = this._fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

    this.pickupLocation = this._fb.group({
      pickup: ['', [Validators.required]],
    })

  }

  onPlaceSelected(place: string) {
    this.pickupLocation.get('pickup')?.setValue(place)
  }

  addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  submit() {
    if (this.rangeSelect.invalid && this.pickupLocation.invalid) {
      return
    } else {
      const dateDate = this.rangeSelect.getRawValue()
      const pickupData = this.pickupLocation.getRawValue()
      const queryParams = {
        startDate: dateDate.startDate,
        endDate: dateDate.endDate,
        pickup: pickupData.pickup,
        dropoff: pickupData.pickup,
      };

      this._dataSharingService.getData.subscribe((data) => {
        this.sharedData = data
      })

      this.subscribe.add(
        this._service.storeChoice(queryParams, this.sharedData).subscribe({
          next: () => {
            this._router.navigate(['vehicles'])
          },
          error: (err) => {
            if (err.status == 401) {
              this._toastr.warning('Please login to proceed !', err.error.message)
            } else if (err.message.length >=2 ) {
              this._toastr.error('Please select a pickup location')
            } else {
              this._toastr.error('Something went wrong')
            }
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}

