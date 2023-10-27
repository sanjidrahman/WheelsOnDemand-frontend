import { NgModule } from '@angular/core';
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
          { path: 'vehicles', title: 'Admin Vehiclelist' , component: AdminVehiclesComponent},
          { path: 'add-vehicle' , title: 'Admin Add Vehicle', component: AdminAddVehicleComponent},
          { path: 'edit-vehicle/:id', title: 'Edit Vehicle', component: AdminEditVehicleComponent},
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
