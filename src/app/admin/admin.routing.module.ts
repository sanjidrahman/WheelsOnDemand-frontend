import { NgModule, Pipe } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginRegisterComponent } from './admin-login-register/admin-login-register.component';
import { AdminDashboarddComponent } from './admin-dashboardd/admin-dashboardd.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';
import { ViewHostDetailsComponent } from './admin-view-host-details/view-host-details.component';
import { AdminHostlistComponent } from './admin-hostlist/admin-hostlist.component';
import { AdminVehiclesComponent } from './admin-vehicles/admin-vehicles.component';
import { AdminAddVehicleComponent } from './admin-add-vehicle/admin-add-vehicle.component';
import { adminGuardGuard } from './admin-guards/admin-guard.guard';
import { adminGuardChildGuard } from './admin-guards/admin-guard-child.guard';
import { AdminEditVehicleComponent } from './admin-edit-vehicle/admin-edit-vehicle.component';
import { AdminHostVehicleDetailsComponent } from './admin-host-vehicle-details/admin-host-vehicle-details.component';
import { AdminBookingListComponent } from './admin-booking-list/admin-booking-list.component';
import { AdminBookingDetailsComponent } from './admin-booking-details/admin-booking-details.component';

const routes: Routes = [
  { path: '', title: 'Admin Login', component: AdminLoginRegisterComponent, canActivate: [adminGuardGuard] },
  {
    path: '', children: [
      {
        path: 'a',
        component: AdminNavigationComponent,
        canActivateChild: [adminGuardChildGuard],
        children: [
          { path: 'dashboard', title: 'Admin Dashboard', component: AdminDashboarddComponent },
          { path: 'userlist', title: 'Admin Userlist', component: AdminUserlistComponent },
          { path: 'hostlist', title: 'Admin Hostlist', component: AdminHostlistComponent },
          { path: 'view-details/:id', title: 'Admin Host Details', component: ViewHostDetailsComponent },
          { path: 'vehicles', title: 'Admin Vehiclelist', component: AdminVehiclesComponent },
          { path: 'add-vehicle', title: 'Admin Add Vehicle', component: AdminAddVehicleComponent },
          { path: 'edit-vehicle/:id', title: 'Edit Vehicle', component: AdminEditVehicleComponent },
          { path: 'host-vehicle-details/:id', title: 'View Vehicle Details', component: AdminHostVehicleDetailsComponent },
          { path: 'bookings', title: 'Admin Bookings', component: AdminBookingListComponent },
          { path: 'booking-details/:b_id', title: 'Admin Booking Details', component: AdminBookingDetailsComponent},
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
