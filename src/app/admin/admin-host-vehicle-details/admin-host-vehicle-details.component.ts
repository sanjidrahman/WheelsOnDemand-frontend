import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, map } from 'rxjs';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { MatDialog } from '@angular/material/dialog';
import { SubmitRejectvehicleComponent } from 'src/app/popups/submit-rejectvehicle/submit-rejectvehicle.component';

@Component({
  selector: 'app-admin-host-vehicle-details',
  templateUrl: './admin-host-vehicle-details.component.html',
  styleUrls: ['./admin-host-vehicle-details.component.css']
})
export class AdminHostVehicleDetailsComponent implements OnInit, OnDestroy {

  images: GalleryItem[] = []
  data!: string[] | undefined
  imageData!: any[]
  vehicleDetails!: IVehicleModel | undefined
  private subscribe = new Subscription()

  constructor(
    private _service: AdminService,
    private _store: Store<vehicleState>,
    private _toastr: ToastrService,
    private _activatedroute: ActivatedRoute,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const id = this._activatedroute.snapshot.paramMap.get('id')
    this.subscribe.add(
      this._service.getVehicleDetails(id).subscribe((res) => {
        this.vehicleDetails = res
      })
    )

    setTimeout(() => {
      this.loadImage()
    }, 50);

  }

  loadImage() {
    if (this.vehicleDetails) {
      this.data = this.vehicleDetails?.images
      if (this.data) {
        const data = this.data.map((i) => {
          const imageUrl = `${environment.STATIC_FILE_API}${i}`
          return {
            srcUrl: imageUrl,
            previewUrl: imageUrl
          }
        })
        this.imageData = data
      }
      this.images = this.imageData.map(
        (item: any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
      );
    }
  }

  getDoc(file: any) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  verifyVehicle(vehicleid: string, hostid: any) {
    this.subscribe.add(
      this._service.verifyVehicle(vehicleid, hostid._id).subscribe({
        next: () => {
          this._toastr.success('Vehicle Verified !')
        },
        error: (err) => {
          this._toastr.error('Something went wrong')
          console.log(err);
        }
      })
    )
  }

  rejectVehiclePopup(hostid: any) {
    this._dialog.open(SubmitRejectvehicleComponent, {
      data: hostid._id,
      width: '50%',
      maxHeight: '90vh',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
