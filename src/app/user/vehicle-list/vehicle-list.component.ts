import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { userState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import jwt_decode from "jwt-decode";
import { retrieveuser } from 'src/app/store/state/app.actions';
import { getuser } from 'src/app/store/state/app.selectors';
import { userModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() startDateChild!: Date | string
  @Input() endDateChild!: Date | string
  @Input() pickupChild!: string
  @Input() dropoffChild!: string
  @Input() daysChild!: number
  vehicleList!: vehicleModel[];
  customPrice: number[] = []
  userid!: string
  userDetails!: Observable<userModel | undefined>
  private subscribe = new Subscription();

  constructor(
    private _store: Store<userState>,
    private _service: UserService,
    private _toastr: ToastrService,
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.subscribe.add(
        this._service.getVehicle().subscribe((res: any) => {
          this.vehicleList = res.vehicles
        })
      )
    },100)

    // setTimeout(() => {
    //   if(this.daysChild >= 7) {
    //     this.vehicleList.map((v) => {
    //       const dis = (v.price * this.daysChild) * 10 / 100
    //       v.price = v.price * this.daysChild - dis
    //     })
    //   } else {
    //     this.vehicleList.map((v) => {
    //       v.price = v.price * this.daysChild
    //     })
    //   }
    // }, 200);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {
    
  }

}
