import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  startDate!: Date
  endDate!: Date
  pickup!: string
  dropoff!: string
  vehicleList!: vehicleModel[];
  customPrice!: number[]
  private subscribe = new Subscription();

  constructor(
    private _service: UserService,
    private _toastr: ToastrService,
    private _activatedroute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this._activatedroute.queryParams.subscribe(p => {
      this.startDate = p['startDate']
      this.endDate = p['endDate']
      this.pickup = p['pickup']
      this.dropoff = p['dropoff']
    })
    this.subscribe.add(
      this._service.submitChoice(this.startDate, this.endDate, this.pickup, this.dropoff).subscribe((res: any) => {
        console.log(res);
        this.vehicleList = res.vehicleData
        this.customPrice = res.customPrice
      })
    )
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {
    
  }

}
