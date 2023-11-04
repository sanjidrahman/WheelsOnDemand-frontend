import { bookingModel } from 'src/app/models/booking.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/user/signup`, userData, {
      withCredentials: true
    })
  }

  loginUser(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/user/login`, userData, {
      withCredentials: true
    })
  }

  googleLogin(idToken: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/user/auth/login`, idToken, {
      withCredentials: true
    })
  }

  verify(otp: any) {
    return this._http.post(`${this.commonUrl}/user/verify-otp`, otp, {
      withCredentials: true
    })
  }

  storeChoice(choice: any) {
    console.log(choice , 'FROM SERVICE');
    return this._http.put(`${this.commonUrl}/user/store-choice`, choice, {
      withCredentials: true
    } )
  }

  getVehicle() {
    return this._http.get<vehicleModel[]>(`${this.commonUrl}/user/vehicles`, {
      withCredentials: true
    })
  }

  bookVehicle(bookData: object) {
    return this._http.post(`${ this.commonUrl }/user/book-vehicle` , bookData , {
      withCredentials: true
    })
  }

  getBookDetails(id: string | null) {
    return this._http.get<bookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
      withCredentials: true
    })
  }

  getBookings() {
    return this._http.get<bookingModel[]>(`${this.commonUrl}/user/user-booking` , {
      withCredentials: true
    })
  }

  logout() {
    return this._http.post(`${this.commonUrl}/user/logout`, {}, {
      withCredentials: true
    })
  }


  // initMap() {
  //   const myLatlng = { lat: -25.363, lng: 131.044 };
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: myLatlng,
  //   });

  //   let infoWindow = new google.maps.InfoWindow({
  //     content: 'Click the map to get Lat/Lng!',
  //     position: myLatlng,
  //   });

  //   infoWindow.open(map);

  //   map.addListener('click', (mapsMouseEvent: any) => {
  //     infoWindow.close();
  //     infoWindow = new google.maps.InfoWindow({
  //       position: mapsMouseEvent.latLng,
  //     });
  //     infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
  //     infoWindow.open(map);
  //   });
  // }


}
