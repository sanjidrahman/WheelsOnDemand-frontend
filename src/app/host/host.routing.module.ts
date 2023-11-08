import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostLoginRegisterComponent } from './host-login-register/host-login-register.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostOtpCompComponent } from './host-otp-comp/host-otp-comp.component';
import { HostUploadDocComponent } from './host-upload-doc/host-upload-doc.component';
import { HostUploadSuccessComponent } from './host-upload-success/host-upload-success.component';
import { HostNavigationComponent } from './host-navigation/host-navigation.component';
import { HostProfileComponent } from './host-profile/host-profile.component';
import { HostAddVehicleComponent } from './host-add-vehicle/host-add-vehicle.component';
import { HostVehiclesComponent } from './host-vehicles/host-vehicles.component';
import { HostEditVehicleComponent } from './host-edit-vehicle/host-edit-vehicle.component';
import { hostGuardGuard } from './host-guard/host-guard.guard';
import { hostChildGuardGuard } from './host-guard/host-child-guard.guard';
import { HostBookingsComponent } from './host-bookings/host-bookings.component';
import { HostBookingsDetailsComponent } from './host-bookings-details/host-bookings-details.component';

const routes: Routes = [
    { path: '', title: 'Host Login', component: HostLoginRegisterComponent, canActivate: [hostGuardGuard] },
    {
        path: '', children: [
            { path: 'host-otp-verify', title: 'Host OTP-verification', component: HostOtpCompComponent },
            { path: 'host-upload', title: 'Host Document Upload', component: HostUploadDocComponent },
            { path: 'host-upload-success', title: 'Host Upload Success', component: HostUploadSuccessComponent },
            {
                path: 'h', 
                component: HostNavigationComponent, 
                canActivateChild: [hostChildGuardGuard],
                children: [
                    { path: 'dashboard', title: 'Host Dashboard', component: HostDashboardComponent },
                    { path: 'profile', title: 'Host Profile', component: HostProfileComponent },
                    { path: 'vehicles', title: 'Host Vehicles', component: HostVehiclesComponent },
                    { path: 'add-vehicle', title: 'Host Add Vehicle', component: HostAddVehicleComponent },
                    { path: 'edit-vehicle/:id', title: 'Host Edit Vehicle', component: HostEditVehicleComponent },
                    { path: 'bookings', title: 'Host Bookings', component: HostBookingsComponent },
                    { path: 'booking-details/:b_id', title: 'Booking Details', component: HostBookingsDetailsComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HostRoutingModule { }
