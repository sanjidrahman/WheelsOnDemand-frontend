import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { Store } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
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

  vehiclelist!: IVehicleModel[]
  createdby!: any
  totalPage!: number
  currentPage: number = 1
  searchInput!: string
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
      }),
    )
    this._service.pagiantion().subscribe((res: any) => {
      this.totalPage = res.totalPage
    })
  }


  // --------------- pagination --------------- 
  pageArr() {
    const limit = 5; // Adjust the limit as needed
    const start = Math.max(1, this.currentPage - Math.floor(limit / 2));
    const end = Math.min(start + limit - 1, this.totalPage);
  
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  callPag(page: number) {
    this.currentPage = page
    this.subscribe.add(
      this._service.getAllVehicles(page).subscribe((res) => {
        this.vehiclelist = res
      })
    )
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  // -------------------------------------------


  update() {
    this._store.dispatch(retrievevehicles())
    this.subscribe.add(
      this._store.select(getvehicles).subscribe((res: any) => {
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
