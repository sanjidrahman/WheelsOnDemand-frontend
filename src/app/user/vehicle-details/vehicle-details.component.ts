import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ImageItem, GalleryItem, Gallery, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable, map } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { vehicleState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment.development';


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
lightbox: any;

  constructor(
    private _store: Store<vehicleState>,
    private _activatedroute: ActivatedRoute,
    private _gallery: Gallery,
    private _lightbox: Lightbox
  ) { }

  ngOnInit() {
    const id = this._activatedroute.snapshot.paramMap.get('id')

    this._store.dispatch(retrievevehicles())
    this.vehicleDetails = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == id))
    )

    setTimeout(() => {
      this.loadImage()
    }, 50);

  }

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
