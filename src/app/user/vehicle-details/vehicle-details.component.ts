import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ImageItem, GalleryItem } from 'ng-gallery';
import jwt_decode from 'jwt-decode';
import { Observable, map } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { retrieveuser, retrievevehicles } from 'src/app/store/state/app.actions';
import { getuser, getvehicles } from 'src/app/store/state/app.selectors';
import { userState, vehicleState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment.development';
import { userModel } from 'src/app/models/user.model';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})

export class VehicleDetailsComponent implements OnInit {

  images: GalleryItem[] = []
  vehicleDetails!: Observable<vehicleModel | undefined>
  data!: string[] | undefined
  imageData!: any[]
  userDetails!: Observable<userModel | undefined>
  userid!: any
  userChoices: any
  v_price!: number

  constructor(
    private _store: Store<vehicleState>,
    private _userstore: Store<userState>,
    private _activatedroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this._activatedroute.snapshot.paramMap.get('id')

    this._store.dispatch(retrievevehicles())
    this.vehicleDetails = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == id))
    )

    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwt_decode(token)
    } 
    this._userstore.dispatch(retrieveuser())
    this.userDetails = this._userstore.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.userid.id))
    )

    setTimeout(() => {
      this.userDetails.forEach((i) => {
        this.userChoices = i?.choices
      })
    },50)

    setTimeout(() => {
      const startDate = new Date(this.userChoices.startDate)
      const endDate = new Date(this.userChoices.endDate)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const days = timeDiff / (1000 * 3600 * 24)
      if(days >= 7) {
        this.vehicleDetails.forEach((v) => {
          if(v) {
            const dis = (v.price * days) * 10 / 100
            this.v_price = (v.price * days) - dis
          }
        })
      } else {
         this.vehicleDetails.forEach((v) => {
          if(v) {
            this.v_price = v.price * days
          }
        })
      }
    },100)

    setTimeout(() => {
      this.loadImage()
    }, 70);

  }

  // ngAfterContentInit(): void {
  //   this.loadImage()
  // }

  loadImage() {
    this.vehicleDetails.forEach((item) => {
      this.data = item?.images
    })
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
