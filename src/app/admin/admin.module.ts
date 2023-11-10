import { ConfirmationService, MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginRegisterComponent } from './admin-login-register/admin-login-register.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MatRadioModule } from '@angular/material/radio';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminDashboarddComponent } from './admin-dashboardd/admin-dashboardd.component';
import { AdminService } from './services/admin.services';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditpopupComponent } from '../popups/editpopup/editpopup.component';
import { DeletepopupComponent } from '../popups/deletepopup/deletepopup.component';
import { NgConfirmModule  } from 'ng-confirm-box';
import { FileUploadModule } from 'primeng/fileupload';
import { ViewHostDetailsComponent } from './admin-view-host-details/view-host-details.component';
import { AdminHostlistComponent } from './admin-hostlist/admin-hostlist.component';
import { AdminVehiclesComponent } from './admin-vehicles/admin-vehicles.component';
import { AdminAddVehicleComponent } from './admin-add-vehicle/admin-add-vehicle.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { MatSelectModule } from '@angular/material/select';
import { AdminEditVehicleComponent } from './admin-edit-vehicle/admin-edit-vehicle.component';
import { AdminHostVehicleDetailsComponent } from './admin-host-vehicle-details/admin-host-vehicle-details.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';
import { MatStepperModule } from '@angular/material/stepper';
import { AdminBookingListComponent } from './admin-booking-list/admin-booking-list.component';
import { SharedModule } from '../shared-module/shared.module';
import { AdminBookingDetailsComponent } from './admin-booking-details/admin-booking-details.component';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminLoginRegisterComponent,
    AdminNavigationComponent,
    AdminDashboarddComponent,
    AdminUserlistComponent,
    EditpopupComponent,
    DeletepopupComponent,
    ViewHostDetailsComponent,
    AdminHostlistComponent,
    AdminVehiclesComponent,
    AdminAddVehicleComponent,
    AdminEditVehicleComponent,
    AdminHostVehicleDetailsComponent,
    AdminBookingListComponent,
    AdminBookingDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ToastrModule.forRoot(),
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    SidebarModule,
    ButtonModule,
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
    FileUploadModule,
    MatSelectModule,
    GalleryModule,
    LightboxModule,
    MatStepperModule,
    SharedModule
  ],
  providers: [AdminService , MessageService],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})


export class AdminModule { }
