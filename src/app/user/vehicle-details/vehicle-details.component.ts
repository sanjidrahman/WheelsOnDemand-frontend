import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ImageItem, GalleryItem } from 'ng-gallery';
import jwt_decode from 'jwt-decode';
import { Observable, Subscription, map } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { userState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment.development';
import { userModel } from 'src/app/models/user.model';
import { UserService } from '../services/user.service';
import { ChoiceModel } from 'src/app/models/choice.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})

export class VehicleDetailsComponent implements OnInit {

  images: GalleryItem[] = []
  vehicleDetails!: vehicleModel | undefined
  data!: string[] | undefined
  imageData!: any[]
  userid!: any
  userChoices!: ChoiceModel
  v_price!: number
  private subscribe = new Subscription()

  constructor(
    private _service: UserService,
    private _activatedroute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this._activatedroute.snapshot.paramMap.get('id')

    this.subscribe.add(
      this._service.getVehicleDetails(id).subscribe((res) => {
        this.vehicleDetails = res
        this.handleData()
      })
    )
    this._service.getUser().subscribe((res: any) => {
      this.userChoices = res.choices
      this.handleData()
    })

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
}
