import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { HomeComponent } from './user/home/home.component';
import { userGuardGuard } from './user/user-guard.guard';
import { OtpCompComponent } from './user/otp-comp/otp-comp.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'otp-verify' , component: OtpCompComponent},
  { path: 'admin' , loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'host' , loadChildren: () => import('./host/host.module').then(m => m.HostModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
