import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IBookingModel } from 'src/app/interfaces/booking.model';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-host-bookings',
  templateUrl: './host-bookings.component.html',
  styleUrls: ['./host-bookings.component.css']
})
export class HostBookingsComponent implements OnInit, AfterViewInit, OnDestroy {

  bookingdetails!: IBookingModel[]
  displayedColumns: string[] = ['id', 'vehicle', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<IBookingModel>([]);
  dataSourceCompleted = new MatTableDataSource<IBookingModel>([]);
  dataSourceCancelled = new MatTableDataSource<IBookingModel>([]);
  private subscribe = new Subscription()

  constructor(
    private _service: HostService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscribe.add(
      this._service.hostBooking().subscribe({
        next: (res) => {
          this.dataSource.data = res
          this.dataSourceCancelled.data = res.filter(item => item.status == 'cancelled')
          this.dataSourceCompleted.data = res.filter(item => item.status == 'completed')
        },
        error: (err) => {
          // console.log(err);
        }
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
