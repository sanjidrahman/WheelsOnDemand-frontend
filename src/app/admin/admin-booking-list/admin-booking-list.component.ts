import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { bookingModel } from 'src/app/models/booking.model';
import { AdminService } from '../services/admin.services';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-booking-list',
  templateUrl: './admin-booking-list.component.html',
  styleUrls: ['./admin-booking-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminBookingListComponent {

  bookingdetails!: bookingModel[]
  displayedColumns: string[] = ['id', 'vehicle', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<bookingModel>([]);
  dataSourceCompleted = new MatTableDataSource<bookingModel>([]);
  dataSourceCancelled = new MatTableDataSource<bookingModel>([]);
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscribe.add(
    
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
