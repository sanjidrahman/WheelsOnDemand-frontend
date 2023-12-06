import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { IUserModel } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() startDateChild!: Date | string
  @Input() endDateChild!: Date | string
  @Input() pickupChild!: string
  @Input() dropoffChild!: string
  @Input() daysChild!: number
  @Input() transmissionChild: string | undefined
  @Input() fuelChild: string | undefined
  @Input() searchText!: string
  vehicleList!: IVehicleModel[];
  customPrice: number[] = []
  userid!: string
  userDetails!: Observable<IUserModel | undefined>
  totalPage!: number
  currentPage: number = 1
  private subscribe = new Subscription();

  constructor(
    private _service: UserService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listVehicle()
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
      this._service.getVehicle({}, page).subscribe((res) => {
        this.vehicleList = res.vehicles
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

  listVehicle() {
    const query: any = {}
    if (this.fuelChild) query.fuel = this.fuelChild
    if (this.transmissionChild) query.transmission = this.transmissionChild
    this.subscribe.add(
      this._service.getVehicle(query, this.currentPage).subscribe({
        next: (res) => {
          this.vehicleList = res.vehicles
          this.totalPage = Math.ceil(this.vehicleList.length / 6)
        },
        error: (err) => {
          // console.log(err);
        }
      })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listVehicle()
  }

  getImage(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
