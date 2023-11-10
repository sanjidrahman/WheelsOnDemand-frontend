import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { bookingModel } from 'src/app/models/booking.model';
import { AdminService } from '../services/admin.services';
import { MatPaginator } from '@angular/material/paginator';
import { hostModel } from 'src/app/models/host.model';

@Component({
  selector: 'app-admin-booking-list',
  templateUrl: './admin-booking-list.component.html',
  styleUrls: ['./admin-booking-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminBookingListComponent {

  bookingdetails!: bookingModel[]
  ifHost!: hostModel | null
  displayedColumns: string[] = ['id', 'vehicle', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<bookingModel>([]);
  dataSourceCompleted = new MatTableDataSource<bookingModel>([]);
  dataSourceCancelled = new MatTableDataSource<bookingModel>([]);
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getBookings().subscribe((res: any) => {
        console.log(res);
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
