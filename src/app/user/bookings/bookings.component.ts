import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { IBookingModel } from 'src/app/models/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements AfterViewInit, OnInit, OnDestroy {

  private subscribe = new Subscription()
  bookingdetails!: IBookingModel[]
  displayedColumns: string[] = ['id', 'vehicle', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<IBookingModel>([]);
  dataSourceCompleted = new MatTableDataSource<IBookingModel>([]);
  dataSourceCancelled = new MatTableDataSource<IBookingModel>([]);

  constructor(
    private _service: UserService,
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getBookings().subscribe((res) => {
        this.dataSource.data = res
        this.dataSourceCompleted.data = res.filter(item => item.status == 'completed')
        this.dataSourceCancelled.data = res.filter(item => item.status == 'cancelled')
      })
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
