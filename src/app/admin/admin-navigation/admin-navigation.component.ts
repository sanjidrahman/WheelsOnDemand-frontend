import { Component, OnDestroy, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from '../services/admin.services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);

  private subscribe = new Subscription();

  constructor(
    private _service: AdminService,
    private _router: Router,
    private _toastr: ToastrService
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    localStorage.removeItem('adminToken');
    this.subscribe.add(
      this._service.logout().subscribe({
        next: () => {
          this._router.navigate(['/admin']);
          this._toastr.success('Logged out successfully');
        },
        error: (err) => {
          this._toastr.error('Something went wrong')
        },
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
