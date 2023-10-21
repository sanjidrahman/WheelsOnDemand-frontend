import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostLoginRegisterComponent } from './host-login-register/host-login-register.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostOtpCompComponent } from './host-otp-comp/host-otp-comp.component';
import { HostUploadDocComponent } from './host-upload-doc/host-upload-doc.component';
import { HostUploadSuccessComponent } from './host-upload-success/host-upload-success.component';
import { HostNavigationComponent } from './host-navigation/host-navigation.component';

const routes: Routes = [
    { path: '', component: HostLoginRegisterComponent },
    {
        path: '', children: [
            { path: 'host-otp-verify', component: HostOtpCompComponent },
            { path: 'host-upload', component: HostUploadDocComponent },
            { path: 'host-upload-success', component: HostUploadSuccessComponent },
            {
                path: 'h', component: HostNavigationComponent, children: [
                    { path: 'dashboard', component: HostDashboardComponent }
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
