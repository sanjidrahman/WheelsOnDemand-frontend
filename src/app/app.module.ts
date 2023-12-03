import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './user/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { OtpCompComponent } from './user/otp-comp/otp-comp.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppState } from './store/global/App.state';
import { AppEffects } from './store/state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgConfirmModule } from 'ng-confirm-box';
import { MatIconModule } from '@angular/material/icon';
import { SubmitNotverifiedComponent } from './popups/submit-notverified/submit-notverified.component';
import { environment } from 'src/environments/environment.development';
import { AppInterceptor } from './http-interceptor/interceptor.interceptor';
import { EditHostDialogComponent } from './popups/edit-host-dialog/edit-host-dialog.component';
import { ChangePassComponent } from './popups/change-pass/change-pass.component';
import { ResetPasswordComponent } from './user/forgot-password/reset-password/reset-password.component';
import { MailVerifyComponent } from './user/forgot-password/mail-verify/mail-verify.component';
import { SubmitRejectvehicleComponent } from './popups/submit-rejectvehicle/submit-rejectvehicle.component';
import { SelectDateComponent } from './user/select-date/select-date.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VehiclesComponent } from './user/vehicles/vehicles.component';
import { VehicleDetailsComponent } from './user/vehicle-details/vehicle-details.component';
import { GALLERY_CONFIG, GalleryConfig, GalleryModule } from 'ng-gallery';
import { LIGHTBOX_CONFIG, LightboxConfig, LightboxModule } from 'ng-gallery/lightbox';
import { VehicleListComponent } from './user/vehicle-list/vehicle-list.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { BookingSuccessComponent } from './user/booking-success/booking-success.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingsComponent } from './user/bookings/bookings.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileBookingDetailsComponent } from './user/user-profile-booking-details/user-profile-booking-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { BookingCancelReasonComponent } from './popups/booking-cancel-reason/booking-cancel-reason.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ViewAllReviewsComponent } from './user/view-all-reviews/view-all-reviews.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceAutocompleteComponent } from './user/place-autocomplete/place-autocomplete.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { DataSharingService } from './user/services/data-sharing.service';
import { SharedModule } from './shared-module/shared.module';
import { HostPartnershipComponent } from './user/host-partnership/host-partnership.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginRegisterComponent,
    HomeComponent,
    OtpCompComponent,
    SubmitNotverifiedComponent,
    EditHostDialogComponent,
    ChangePassComponent,
    ResetPasswordComponent,
    MailVerifyComponent,
    SubmitRejectvehicleComponent,
    SelectDateComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    VehicleListComponent,
    CheckoutComponent,
    BookingSuccessComponent,
    UserProfileComponent,
    BookingsComponent,
    ProfileComponent,
    UserProfileBookingDetailsComponent,
    BookingCancelReasonComponent,
    ViewAllReviewsComponent,
    NotFoundComponent,
    PlaceAutocompleteComponent,
    HostPartnershipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-ripple-multiple' }),
    NgConfirmModule,
    MatIconModule,
    CommonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GalleryModule,
    LightboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    ScrollingModule,
    NgxStarRatingModule,
    SharedModule
  ],
  exports: [NgxSpinnerModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.CLIENT_ID
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    },
    DataSharingService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
