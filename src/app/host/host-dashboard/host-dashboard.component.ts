import { Component } from '@angular/core';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {


  constructor(
    private _service: HostService,
  ){}

}
