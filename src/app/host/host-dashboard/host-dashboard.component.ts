import { Component, OnDestroy, OnInit } from '@angular/core';
import { HostService } from '../services/host.service';
import { Subscription } from 'rxjs';
import { ITrendingVehicleModel } from '../../models/host-dashboard-trending-vehicle.model';
import { environment } from '../../../environments/environment.development';
import { IVehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit, OnDestroy {

  data: any
  options: any
  totalHostRevenue!: number;
  bookedCount!: number;
  completedCount!: number;
  cancelledCount!: number;
  trendingVehicle!: IVehicleModel
  latestOrder!: ITrendingVehicleModel[]
  private subscribe = new Subscription()

  constructor(
    private _service: HostService,
  ) { }

  ngOnInit(): void {
    this._service.getDashboard().subscribe({
      next: (res: any) => {
        this.totalHostRevenue = res.hostRevenue
        this.bookedCount = res.bookedCount
        this.completedCount = res.completedCount
        this.cancelledCount = res.cancelledBooking
        this.trendingVehicle = res.trending
        this.latestOrder = res.latestOrders
      
        this.loadCircle()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadCircle() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Booked', 'Cancelled', 'Completed'],
      datasets: [
        {
          data: [this.bookedCount, this.cancelledCount, this.completedCount],
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

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  ngOnDestroy(): void {

  }

}
