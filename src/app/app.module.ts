import { MinimaDark, MinimaLight } from '@alyle/ui/themes/minima';
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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MailVerifyComponent } from './forgot-password/mail-verify/mail-verify.component';
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
import { PriceCalculationPipe } from './user/pipe/price-calculation.pipe';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingsComponent } from './user/bookings/bookings.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileBookingDetailsComponent } from './user/user-profile-booking-details/user-profile-booking-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { ImageCropperComponent } from './user/image-cropper/image-cropper.component';
import { LY_THEME, LY_THEME_NAME, LyHammerGestureConfig, LyTheme2, StyleRenderer } from '@alyle/ui';
import { BookingCancelReasonComponent } from './popups/booking-cancel-reason/booking-cancel-reason.component';
import { CapitalizePipePipe } from './host/pipe/capitalize-pipe.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';


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
    ForgotPasswordComponent,
    MailVerifyComponent,
    SubmitRejectvehicleComponent,
    SelectDateComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    VehicleListComponent,
    CheckoutComponent,
    BookingSuccessComponent,
    PriceCalculationPipe,
    UserProfileComponent,
    BookingsComponent,
    ProfileComponent,
    UserProfileBookingDetailsComponent,
    ImageCropperComponent,
    BookingCancelReasonComponent,
    // CapitalizePipePipe
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
    NgConfirmModule,
    MatIconModule,
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
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    ScrollingModule,
  ],
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
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
        exitAnimationTime: 1000
      } as LightboxConfig
    },
    [LyTheme2],
    [StyleRenderer],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig } // Required for <ly-carousel>
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
