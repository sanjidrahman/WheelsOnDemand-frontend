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

const routes: Routes = [
    { path: '', title: 'Host Login', component: HostLoginRegisterComponent },
    {
        path: '', children: [
            { path: 'host-otp-verify', title: 'Host OTP-verification', component: HostOtpCompComponent },
            { path: 'host-upload', title: 'Host Document Upload', component: HostUploadDocComponent },
            { path: 'host-upload-success', title: 'Host Upload Success', component: HostUploadSuccessComponent },
            {
                path: 'h', component: HostNavigationComponent, children: [
                    { path: 'dashboard', title: 'Host Dashboard', component: HostDashboardComponent },
                    { path: 'profile', title: 'Host Profile', component: HostProfileComponent },
                    { path: 'vehicles', title: 'Host Vehicles', component: HostVehiclesComponent },
                    { path: 'add-vehicle', title: 'Host Add Vehicle', component: HostAddVehicleComponent },
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
