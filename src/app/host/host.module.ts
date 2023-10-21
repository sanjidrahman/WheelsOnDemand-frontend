import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostLoginRegisterComponent } from './host-login-register/host-login-register.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostFooterComponent } from './host-footer/host-footer.component';
import { HostHeaderComponent } from './host-header/host-header.component';
import { HostRoutingModule } from './host.routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { HostOtpCompComponent } from './host-otp-comp/host-otp-comp.component';
import { HostService } from './services/host.service';
import { HostUploadDocComponent } from './host-upload-doc/host-upload-doc.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HostUploadSuccessComponent } from './host-upload-success/host-upload-success.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HostNavigationComponent } from './host-navigation/host-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgConfirmModule } from 'ng-confirm-box';

@NgModule({
  declarations: [
    HostLoginRegisterComponent,
    HostDashboardComponent,
    HostFooterComponent,
    HostHeaderComponent,
    HostOtpCompComponent,
    HostUploadDocComponent,
    HostUploadSuccessComponent,
    HostNavigationComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    GoogleSigninButtonModule,
    ToastrModule.forRoot(),
    FileUploadModule,
    RxReactiveFormsModule,
    MatSidenavModule,
    SidebarModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    NgConfirmModule,
  ],
  providers:[HostService],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HostModule { }
