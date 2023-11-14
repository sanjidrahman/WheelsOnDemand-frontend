import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageItem, GalleryItem } from 'ng-gallery';
import jwt_decode from 'jwt-decode';
import { Observable, Subscription } from 'rxjs';
import { IReview, IVehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { IChoiceModel } from 'src/app/models/choice.model';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})

export class VehicleDetailsComponent implements OnInit, OnDestroy {

  images: GalleryItem[] = []
  vehicleDetails!: IVehicleModel | undefined
  data!: string[] | undefined
  imageData!: any[]
  userChoices!: IChoiceModel
  reviews!: IReview[] | any
  v_price!: number
  v_id!: string | null
  userId!: string
  private subscribe = new Subscription()

  constructor(
    private _service: UserService,
    private _activatedroute: ActivatedRoute,
    private _toastr: ToastrService,
    private _ngConfirm: NgConfirmService,
  ) { }

  ngOnInit() {
    this.v_id = this._activatedroute.snapshot.paramMap.get('id')

    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res: IVehicleModel) => {
        this.vehicleDetails = res
        this.reviews = res.review
        this.handleData()
      })
    )
    this.subscribe.add(
      this._service.getUser().subscribe((res: any) => {
        this.userChoices = res.choices
        this.handleData()
      })
    )
    
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded: any = jwt_decode(token) 
      this.userId = decoded.id
    } 
  }

  handleData() {
    if (this.userChoices && this.vehicleDetails) {
      const startDate = new Date(this.userChoices.startDate);
      const endDate = new Date(this.userChoices.endDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const days = timeDiff / (1000 * 3600 * 24);
      if (days >= 7) {
        const vprice = this.vehicleDetails.price;
        const dis = (vprice * days * 10) / 100;
        this.v_price = vprice * days - dis;
      } else {
        const vprice = this.vehicleDetails.price;
        this.v_price = vprice * days;
      }

      this.loadImage();
    }
  }

  loadImage() {
    if (this.vehicleDetails) {
      this.data = this.vehicleDetails.images
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

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteReview(r_id: string | undefined) {
    this._ngConfirm.showConfirm('Are you sure to proceed with action ?', () => {
      this.subscribe.add(
        this._service.deleteReview(this.v_id, r_id).subscribe({
          next: () => {
            this._toastr.success('Review deleted successfully')
          },
          error: (err) => {
            this._toastr.error('Something went wrong', err.error.message)
          }
        })
      )
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
