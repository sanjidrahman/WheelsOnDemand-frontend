import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { IJwtData } from '../../interfaces/jwt.interface';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ScriptLoaderService } from '../../scripts-loader/script.loader';
declare var google: any;

@Component({
  selector: 'app-admin-add-vehicle',
  templateUrl: './admin-add-vehicle.component.html',
  styleUrls: ['./admin-add-vehicle.component.css']
})
export class AdminAddVehicleComponent implements OnInit, AfterViewInit, OnDestroy {

  files: File[] = [];
  selectedfiles: File[] = []
  vehicleForm!: FormGroup
  transmission: string[] = ['Automatic', 'Manual'];
  fuel: string[] = ['Petrol', 'Diesel', 'Electric']
  isLinear = false;
  document!: File | null
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup
  map: any;
  token!: IJwtData
  private subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: AdminService,
    private _router: Router,
    private _scriptLoaderService: ScriptLoaderService,
  ) { }

  ngOnInit(): void {

    this.vehicleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      make: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })

    this.firstFormGroup = this._fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._fb.group({
      secondCtrl: ['', Validators.required],
    });

    const token = localStorage.getItem('adminToken')
    if (token) this.token = jwtDecode(token)

  }

  ngAfterViewInit(): void {
    this.subscribe.add(
      this._scriptLoaderService.loadScript(environment.MAP_SCRIPT, () => {
      })
    );
    window['initMap'] = () => {
      this.initMap();
    }
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
      this.selectedfiles = event.target.files
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
    if (this.vehicleForm.invalid && this.firstFormGroup && this.secondFormGroup) {
      return
    }
    const form = new FormData()
    let data = this.vehicleForm.getRawValue()
    form.append('name', data.name);
    form.append('brand', data.brand);
    form.append('make', data.make);
    form.append('transmission', data.transmission);
    form.append('fuel', data.fuel);
    form.append('location', data.location);
    form.append('price', data.price);
    if (this.document) form.append('doc', this.document, this.document?.name)
    for (const file of this.selectedfiles) {
      form.append('files', file, file.name);
    }

    this._service.addvehicle(form, this.token.id).subscribe({
      next: (res) => {
        this._router.navigate(['/admin/a/vehicles'])
        this._toastr.success('Registered vehicle to collection!')
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }

  initMap() {
    this.map = new google.maps.Map(
      document.getElementById('admin-add-map') as HTMLElement,
      {
        center: { lat: 21.7679, lng: 78.8718 },
        zoom: 5,
      }
    );

    const current_location = document.getElementById('current-btn') as HTMLElement
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(current_location);

    const input = document.getElementById("admin-add-input") as HTMLInputElement;

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
      console.log('Hi im not there');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords, 'll');
      this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
    }, (err) => {
      console.log(err);
      
      this._toastr.warning('Please check your location permission !')
    })
  }
  getReverseGeocodingData(lat: number, lng: number) {
    console.log(lat, lng);
    
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
          const input = document.getElementById("pac-input") as HTMLInputElement;
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
