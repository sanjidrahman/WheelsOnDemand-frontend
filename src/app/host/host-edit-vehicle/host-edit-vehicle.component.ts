import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from '../services/host.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { NgConfirmService } from 'ng-confirm-box';
declare var google: any;

@Component({
  selector: 'app-host-edit-vehicle',
  templateUrl: './host-edit-vehicle.component.html',
  styleUrls: ['./host-edit-vehicle.component.css'],
})
export class HostEditVehicleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('editInputLocation') editInputLocation!: ElementRef

  vehicle!: IVehicleModel | undefined;
  vehicleForm!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  document!: File | null;
  vehicleLocation!: string 
  transmission: string[] = ['Automatic', 'Manual'];
  fuel: string[] = ['Petrol', 'Diesel', 'Electric'];
  files: File[] = [];
  selectedFiles: File[] = []
  v_id!: string | null;
  isLinear = false;
  map: any
  private subscribe = new Subscription();

  constructor(
    private _activatedroute: ActivatedRoute,
    private _fb: FormBuilder,
    private _service: HostService,
    private _toastr: ToastrService,
    private _router: Router,
    private _ngConfirm: NgConfirmService
  ) { }

  ngOnInit(): void {
    // ---- for retrieving vehicle details ----
    this.update()
    // ----------------------------------------

    this.vehicleForm = this._fb.group({
      name: ['', Validators.required],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      make: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

  update() {
    this.v_id = this._activatedroute.snapshot.paramMap.get('id')
    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res) => {
        this.vehicle = res
        this.vehicleLocation = res.location
      })
    )
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteImage(v_id: string, file: string) {
    this._ngConfirm.showConfirm('Are you sure to proceed with your action', () => {
      this.subscribe.add(
        this._service.deleteVehicleImage(file, v_id).subscribe({
          next: (res) => {
            this.update()
            this._toastr.success('Image deleted successfully !');
          },
          error: (err) => {
            if (err.status == 400) {
              this._toastr.error('Vehicle should have one image')
            } else {
              this._toastr.error('Something went wrong');
            }
          }
        })
      )
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  getFile(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (event.target.files.length > 0) {
      const n = event.target.files.length
      for (let i = 0; i < n; i++) {
        const file = event.target.files[i]
        const extension = this.getFileExtension(file.name)
        if (allowedExtensions.includes(extension)) {
          this.files.push(file.name)
        } else {
          alert('Please select a valid image file (jpg, jpeg, png, or gif).');
        }
      }
      this.selectedFiles = event.target.files
    }
  }
  getFileExtension(filename: string): any {
    return filename.split('.').pop();
  }

  getDocument(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    this.document = <File>event.target.files[0];

    if (this.document) {
      const fileExtension = this.getFileExtensionn(this.document.name);

      if (!allowedExtensions.includes(fileExtension)) {
        this.document = null;
        alert('Please select a valid image file (jpg, jpeg, png, or gif).');
      }
    }
  }
  getFileExtensionn(filename: string): any {
    return filename.split('.').pop();
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      return
    }
    const form = new FormData()
    let data = this.vehicleForm.getRawValue()
    this.vehicleForm.get('location')?.setValue(this.vehicleLocation)
    form.append('name', data.name);
    form.append('brand', data.brand);
    form.append('make', data.make);
    form.append('transmission', data.transmission);
    form.append('fuel', data.fuel);
    form.append('location', data.location);
    form.append('price', data.price);
    if (this.document) form.append('doc', this.document, this.document?.name)
    for (const file of this.selectedFiles) {
      form.append('files', file, file.name);
    }

    if (this.v_id) {
      this.subscribe.add(
        this._service.editVehicle(form, this.v_id).subscribe({
          next: () => {
            this._router.navigate(['/host/h/vehicles'])
            this._toastr.success('Vehicle Edited Successfully')
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
        })
      )
    }
  }

  initMap() {
    this.map = new google.maps.Map(
      document.getElementById('host-edit-map') as HTMLElement,
      {
        center: { lat: 21.7679, lng: 78.8718 },
        zoom: 5,
      }
    );

    const current_location = document.getElementById('current-btn') as HTMLElement
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(current_location);

    const input = this.editInputLocation?.nativeElement

    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { 'country': ['IN'] },
      fields: ["place_id", "geometry", "formatted_address", "name"],
    });

    autocomplete.bindTo("bounds", this.map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({ map: this.map });

    marker.addListener("click", () => {
      infowindow.open(this.map, marker);
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();

      const place = autocomplete.getPlace();

      this.vehicleForm.get('location')?.setValue(place.name)

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });

      marker.setVisible(true);

      (
        infowindowContent.children.namedItem("place-name") as HTMLElement
      ).textContent = place.name as string;
      (
        infowindowContent.children.namedItem("place-address") as HTMLElement
      ).textContent = place.formatted_address as string;
      infowindow.open(this.map, marker);
    });
  }

  currentLocation() {
    if (!navigator.geolocation) {
      this._toastr.warning('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
    }, (err) => {
      this._toastr.warning('Please check your location permission !')
    })
  }
  getReverseGeocodingData(lat: number, lng: number) {
    const latlng = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, (results: any[], status: any) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }

      if (status === google.maps.GeocoderStatus.OK) {
        const place = results[0];

        if (place && place.formatted_address) {
          // setting the place in the input field and form value
          const input = this.editInputLocation?.nativeElement
          input.value = place.formatted_address
          this.vehicleForm.get('location')?.setValue(place.address_components[0].short_name)

          // setting infowindow 
          const infowindow = new google.maps.InfoWindow();
          const infowindowContent = document.getElementById(
            "infowindow-content"
          ) as HTMLElement;

          infowindow.setContent(infowindowContent);

          //setting marker
          const marker = new google.maps.Marker({ map: this.map });

          if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
          } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
          }

          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location,
          });

          marker.setVisible(true);

          (
            infowindowContent.children.namedItem("place-name") as HTMLElement
          ).textContent = place.address_components[0].short_name as string;
          (
            infowindowContent.children.namedItem("place-address") as HTMLElement
          ).textContent = place.formatted_address as string;
          infowindow.open(this.map, marker);

        } else {
          this._toastr.error('No address details available for the location.');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
