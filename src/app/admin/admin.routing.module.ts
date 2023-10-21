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

const routes: Routes = [
  
  { path: '', component: AdminLoginRegisterComponent },
  {
    path: '', children: [
      {
        path: 'a',
        component: AdminNavigationComponent,
        children: [
          { path: 'dashboard', component: AdminDashboarddComponent },
          { path: 'userlist', component: AdminUserlistComponent },
          { path: 'hostlist', component: AdminHostlistComponent },
          { path: 'view-details/:id', component: ViewHostDetailsComponent },
          { path: 'vehicles', component: AdminVehiclesComponent},
          { path: 'add-vehicle' , component: AdminAddVehicleComponent},
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
