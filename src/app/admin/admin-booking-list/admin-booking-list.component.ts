import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IBookingModel } from 'src/app/interfaces/booking.model';
import { AdminService } from '../services/admin.services';
import { MatPaginator } from '@angular/material/paginator';
import { IHostModel } from 'src/app/interfaces/host.model';

@Component({
  selector: 'app-admin-booking-list',
  templateUrl: './admin-booking-list.component.html',
  styleUrls: ['./admin-booking-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminBookingListComponent {

  bookingdetails!: IBookingModel[]
  ifHost!: IHostModel | null
  displayedColumns: string[] = ['id', 'vehicle', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<IBookingModel>([]);
  dataSourceCompleted = new MatTableDataSource<IBookingModel>([]);
  dataSourceCancelled = new MatTableDataSource<IBookingModel>([]);
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getBookings().subscribe((res: any) => {
        res.bookings.forEach((e: any) => {
          this.ifHost = e.vehicleId.createdBy;
        });
        this.dataSource.data = res.bookings
        this.dataSourceCancelled.data = res.bookings.filter((item: any) => item.status == 'cancelled')
        this.dataSourceCompleted.data = res.bookings.filter((item: any) => item.status == 'completed')
      })
    )
  }

  customClass(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'status-cancelled';
      case 'Booked':
        return 'status-booked';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }


}
