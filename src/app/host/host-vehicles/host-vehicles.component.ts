import { Observable, Subscription, find, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { vehicleModel } from '../../../../src/app/models/vehicle.model';
import { vehicleState } from '../../../../src/app/store/state/app.state';
import { retrievevehicles } from '../../../../src/app/store/state/app.actions';
import { getvehicles } from '../../../../src/app/store/state/app.selectors';
import jwt_decode from "jwt-decode";
import { HostService } from '../services/host.service';
import { environment } from 'src/environments/environment.development';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-host-vehicles',
  templateUrl: './host-vehicles.component.html',
  styleUrls: ['./host-vehicles.component.css']
})
export class HostVehiclesComponent implements OnInit {

  hostVehicles!: vehicleModel[]
  token!: any
  private subscribe = new Subscription()

  constructor(
    private _service: HostService,
    private _store: Store<vehicleState>,
    private _ngConfirm: NgConfirmService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._service.hostVehicle().subscribe((res) => {
      this.hostVehicles = res
    })
    const token = localStorage.getItem('hostToken')
    if(token) this.token = jwt_decode(token) 
    // this._store.dispatch(retrievevehicles())
    // this.hostVehicles = this._store.pipe(
    //   select(getvehicles),
    //   map(v => v.find(vehicle => vehicle.createdBy == this.token.id)))
    //   console.log(this.hostVehicles);
  }

  update() {
    this._service.hostVehicle().subscribe((res) => {
      this.hostVehicles = res
    })
  }

  getImage(file : any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteVehicle(id: string) {
    this._ngConfirm.showConfirm('Are you sure you want to procees ?', () => {
      this.subscribe.add(
        this._service.deleteVehicle(id).subscribe({
          next: () => {
            this.update()
            this._toastr.success('Vehicle deleted successfully')
          },
          error: (err) => {
            this._toastr.error('Something went wrong')
          }
        }
        )
      )
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

}
