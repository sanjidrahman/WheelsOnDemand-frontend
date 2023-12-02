import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IVehicleModel } from '../../../../src/app/models/vehicle.model';
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

  totalPage!: number
  currentPage: number = 1
  hostVehicles!: IVehicleModel[]
  token!: any
  searchInput!: string
  private subscribe = new Subscription()

  constructor(
    private _service: HostService,
    private _ngConfirm: NgConfirmService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._service.hostVehicle().subscribe((res: any) => {
      this.hostVehicles = res.vehicle
      this.totalPage = res.totalPage
    })
  }

  // --------------- pagination --------------- 
  pageArr() {
    const limit = 5; 
    const start = Math.max(1, this.currentPage - Math.floor(limit / 2));
    const end = Math.min(start + limit - 1, this.totalPage);
  
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  callPag(page: number) {
    this.currentPage = page
    this.subscribe.add(
      this._service.hostVehicle(page).subscribe((res: any) => {
        this.hostVehicles = res.vehicle
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
