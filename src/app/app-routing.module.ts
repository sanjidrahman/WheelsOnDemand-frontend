import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { HomeComponent } from './user/home/home.component';
import { userGuardGuard } from './user/user-guard.guard';
import { OtpCompComponent } from './user/otp-comp/otp-comp.component';
import { MailVerifyComponent } from './forgot-password/mail-verify/mail-verify.component';
import { adminGuardGuard } from './admin/admin-guards/admin-guard.guard';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'home' , redirectTo: '' , pathMatch: 'full'},
  { path: 'login', title: 'Login', component: LoginRegisterComponent },
  { path: 'otp-verify', title: 'OTP-Verify', component: OtpCompComponent },
  { path: 'mail-verify', title: 'Mail Verify', component: MailVerifyComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'host', loadChildren: () => import('./host/host.module').then(m => m.HostModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
