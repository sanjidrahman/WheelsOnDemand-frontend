import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserModel } from 'src/app/models/user.model';
import { AdminService } from '../services/admin.services';
import { Subscription } from 'rxjs';
import { IVehicleModel } from '../../models/vehicle.model';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-admin-dashboardd',
  templateUrl: './admin-dashboardd.component.html',
  styleUrls: ['./admin-dashboardd.component.css']
})
export class AdminDashboarddComponent implements OnInit, OnDestroy {

  users!: IUserModel[]
  data: any;
  options: any;
  dataGraph: any;
  optionsGraph: any;
  totalRevenue!: number;
  hostGenerated!: number;
  bookingCompletedCount!: number;
  bookingCancelledCount!: number;
  bookingBookedCount!: number;
  totalVehicles!: number
  monthlyGenerated!: number[]
  mostBookedVehicle!: IVehicleModel
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService,
  ) { }

  ngOnInit(): void {

    this.subscribe.add(
      this._service.getDashboardData().subscribe({
        next: (res: any) => {
          console.log(res);
          this.bookingBookedCount = res.bookingBookingCount
          this.bookingCancelledCount = res.cancelledBookingCount
          this.bookingCompletedCount = res.completeBookingCount
          this.totalVehicles = res.totalVehicles
          this.totalRevenue = res.totalAmount
          this.hostGenerated = res.hostGenerated
          this.monthlyGenerated = res.amountGeneratedEachMonth
          this.mostBookedVehicle = res.mostBookedVehicle

          this.loadCircle()
          this.loadGraph()
        },
        error: (err) => {
          console.log(err);
        }
      })
    )

  }

  loadCircle() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Booked', 'Cancelled', 'Completed'],
      datasets: [
        {
          data: [this.bookingBookedCount, this.bookingCancelledCount, this.bookingCompletedCount],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  loadGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataGraph = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Monthly Generated Amount',
          data: this.monthlyGenerated,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        // {
        //   label: 'Second Dataset',
        //   data: [28, 48, 40, 19, 86, 27, 90, 87, 45, 65, 90, 10000],
        //   fill: false,
        //   borderColor: documentStyle.getPropertyValue('--pink-500'),
        //   tension: 0.4
        // }
      ]
    };

    this.optionsGraph = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

getImage(file: string) {
  return `${environment.STATIC_FILE_API}${file}`
}

ngOnDestroy(): void {

}

}
