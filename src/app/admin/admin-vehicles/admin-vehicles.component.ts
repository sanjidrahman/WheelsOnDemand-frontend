import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { Store } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { SubmitNotverifiedComponent } from 'src/app/popups/submit-notverified/submit-notverified.component';
import { ToastrService } from 'ngx-toastr';
import { SubmitRejectvehicleComponent } from 'src/app/popups/submit-rejectvehicle/submit-rejectvehicle.component';
import { NgConfirmService } from 'ng-confirm-box';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['./admin-vehicles.component.css']
})
export class AdminVehiclesComponent implements OnInit, OnDestroy {

  vehiclelist!: vehicleModel[]
  createdby!: any
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService,
    private _store: Store<vehicleState>,
    private _toastr: ToastrService,
    private _ngConfirm: NgConfirmService,
  ) { }

  ngOnInit(): void {
    this._store.dispatch(retrievevehicles())
    this.subscribe.add(
      this._store.select(getvehicles).subscribe((res) => {
        this.vehiclelist = res
      })
    )
  }

  update() {
    this._store.dispatch(retrievevehicles())
    this.subscribe.add(
      this._store.select(getvehicles).subscribe((res) => {
        this.vehiclelist = res
      })
    )
  }

  getImage(file: any) {
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

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }

}
