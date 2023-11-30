import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-partnership',
  templateUrl: './host-partnership.component.html',
  styleUrl: './host-partnership.component.css'
})
export class HostPartnershipComponent {
  agreeChecked = false;

  constructor(
    private _toastr: ToastrService,
    private _router: Router,
  ){}

  onclick() {
    if (this.agreeChecked) {
     localStorage.removeItem('userToken')
     this._router.navigate(['/host'])
    } else {
      this._toastr.warning('Please agree Terms & Conditions')
    }
  }

}
