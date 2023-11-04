import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { HomeComponent } from './user/home/home.component';
import { OtpCompComponent } from './user/otp-comp/otp-comp.component';
import { MailVerifyComponent } from './forgot-password/mail-verify/mail-verify.component';
import { userGuardLogged, userGuardLogout } from './user/user-guard.guard';
import { SelectDateComponent } from './user/select-date/select-date.component';
import { VehiclesComponent } from './user/vehicles/vehicles.component';
import { VehicleDetailsComponent } from './user/vehicle-details/vehicle-details.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { BookingSuccessComponent } from './user/booking-success/booking-success.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { BookingsComponent } from './user/bookings/bookings.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserProfileBookingDetailsComponent } from './user/user-profile-booking-details/user-profile-booking-details.component';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'home' , redirectTo: '' , pathMatch: 'full'},
  { path: 'login', title: 'Login', component: LoginRegisterComponent, canActivate: [userGuardLogged]},
  { path: 'otp-verify', title: 'OTP-Verify', component: OtpCompComponent },
  { path: 'mail-verify', title: 'Mail Verify', component: MailVerifyComponent },
  { path: 'select' , title: 'Select Date' , component: SelectDateComponent},
  { path: 'vehicles', title: 'Vehicle', component: VehiclesComponent},
  { path: 'vehicle-details/:id', title: 'Vehicle Details', component: VehicleDetailsComponent},
  { path: 'checkout/:id' , title: 'Checkout', component: CheckoutComponent},
  { path: 'booking-success/:b_id/:v_id', title: 'Booking Success', component: BookingSuccessComponent},
  { path: 'user-profile', title: 'Profile', component: UserProfileComponent , children: [
    { path: 'bookings', component: BookingsComponent },
    { path: 'profile', component: ProfileComponent},
  ]},
  { path: 'booking-details/:b_id', title: 'Booking Details', component: UserProfileBookingDetailsComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'host', loadChildren: () => import('./host/host.module').then(m => m.HostModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
