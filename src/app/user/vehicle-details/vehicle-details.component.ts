import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageItem, GalleryItem } from 'ng-gallery';
import { jwtDecode } from "jwt-decode";
import { Observable, Subscription } from 'rxjs';
import { IReviewModel, IVehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../services/user.service';
import { IChoiceModel } from 'src/app/models/choice.model';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})

export class VehicleDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('exampleModal', {static: false} ) reviewModal!: ElementRef;

  reviewForm!: FormGroup
  rating!: number[]
  images: GalleryItem[] = []
  vehicleDetails!: IVehicleModel | undefined
  data!: string[] | undefined
  imageData!: any[]
  userChoices!: IChoiceModel
  reviews!: IReviewModel[] | any
  v_price!: number
  v_id!: string | null
  userId!: string
  isBookedCompleted: boolean = true
  private subscribe = new Subscription()

  constructor(
    private _service: UserService,
    private _activatedroute: ActivatedRoute,
    private _toastr: ToastrService,
    private _ngConfirm: NgConfirmService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.loadVehicleData()
   
    this.subscribe.add(
      this._service.getUser().subscribe((res: any) => {
        this.userChoices = res.choices
        this.handleData()
      })
    )
    this.subscribe.add(
      this._service.isBookingCompleted(this.v_id).subscribe((res: any) => {
        // this.isBookedCompleted = res.hasCompletedBooking
      })
    )

    const token = localStorage.getItem('userToken')
    if(token) {
      var decoded: any = jwtDecode(token)
    }
    this.userId = decoded.id

    this.reviewForm = this._fb.group({
      review: ['', Validators.required],
      rating: ['', Validators.required]
    })

  }

  loadVehicleData() {
    this.v_id = this._activatedroute.snapshot.paramMap.get('id')

    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res: IVehicleModel) => {
        this.vehicleDetails = res
        this.reviews = res.review
        res.review.forEach((val) => {
          this.getStarArray(val.rating)
        })
        this.handleData()
      })
    )
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

  getStarArray(rating: number): void {
    this.rating = Array(rating).fill(0).map((_, index) => index + 1);
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
            this.loadVehicleData()
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

  close() {
    (this.reviewModal.nativeElement as HTMLElement).style.display = 'none'
    // this.modalVisible = false
  }

  submitReview() {
    if(this.reviewForm.invalid) {
      return
    } else {
      const data = this.reviewForm.getRawValue()
      this.subscribe.add(
        this._service.postReview(data, this.v_id).subscribe({
          error: (err) => {
            console.log(err);
            this._toastr.error('Something went wrong')
          },
          complete: () => {
            this.ngOnInit()
            this._toastr.success('Review uploaded successfully')
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
