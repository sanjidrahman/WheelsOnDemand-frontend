import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { Store } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['./admin-vehicles.component.css']
})
export class AdminVehiclesComponent implements OnInit {
 
  vehiclelist!: vehicleModel[]

  constructor(
    private _service: AdminService,
    private _store: Store<vehicleState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(retrievevehicles())
    this._store.select(getvehicles).subscribe((res) => {
      this.vehiclelist = res
    })
  }

  getImage(file:any) {
    return `${environment.STATIC_FILE_API}${file}`
  }


  addVehicle() {
    throw new Error('Method not implemented.');
  }
  editVehicle: any;
  vehicles: any;
  deleteVehicle(_t7: any) {
    throw new Error('Method not implemented.');
  }

}
