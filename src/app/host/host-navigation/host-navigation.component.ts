import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HostService } from '../services/host.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-host-navigation',
  templateUrl: './host-navigation.component.html',
  styleUrls: ['./host-navigation.component.css']
})
export class HostNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  private subscribe = new Subscription();

  constructor(
    private _service: HostService,
    private _router: Router,
    private _toastr: ToastrService,
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.subscribe.add(
      this._service.logout().subscribe({
        next: () => {
          localStorage.removeItem('hostToken')
          this._router.navigate(['/host'])
          this._toastr.success('Logged out succcessfully')
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
      })
    )
  }
}
