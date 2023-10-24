import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { hostReducer, userReducer } from './store/state/app.reducers';
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
    MatIconModule
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
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
