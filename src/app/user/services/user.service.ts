import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IVehicleModel } from '../../models/vehicle.model';
import { IBookingModel } from '../../models/booking.model';
import { IUserModel } from '../../models/user.model';
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
    return this._http.put(`${this.commonUrl}/user/store-choice`, choice, {
      withCredentials: true
    })
  }

  getVehicle(filters?: any) {
    let params = new HttpParams()
    if (filters) {
      if (filters.fuel) params = params.append('fuel', filters.fuel)
      if (filters.transmission) params = params.append('transmission', filters.transmission)
    }
    return this._http.get<IVehicleModel[]>(`${this.commonUrl}/user/vehicles`, {
      params,
      withCredentials: true
    })
  }

  bookVehicle(bookData: object) {
    return this._http.post(`${this.commonUrl}/user/book-vehicle`, bookData, {
      withCredentials: true
    })
  }

  getBookDetails(id: string | null) {
    return this._http.get<IBookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
      withCredentials: true
    })
  }

  getBookings() {
    return this._http.get<IBookingModel[]>(`${this.commonUrl}/user/user-booking`, {
      withCredentials: true
    })
  }

  updateUser(data: any) {
    return this._http.patch(`${this.commonUrl}/user/update-user`, data, {
      withCredentials: true
    })
  }

  updateProfile(file: any) {
    return this._http.patch(`${this.commonUrl}/user/update-profile`, file, {
      withCredentials: true
    })
  }

  // a common api all interfaces ([user, host, admin] retrieving single vehicle details) 
  getVehicleDetails(id: string | null): Observable<IVehicleModel> {
    return this._http.get<IVehicleModel>(`${this.commonUrl}/host/vehicle-details/${id}`, {
      withCredentials: true
    })
  }

  changePass(data: any) {
    return this._http.patch(`${this.commonUrl}/user/change-password`, data, {
      withCredentials: true
    })
  }

  getUser(): Observable<IUserModel> {
    return this._http.get<IUserModel>(`${this.commonUrl}/user/getuser`, {
      withCredentials: true
    })
  }

  cancelbooking(reason: string, b_id: string, amount: number) {
    return this._http.patch(`${this.commonUrl}/user/cancel-booking/${b_id}`, {reason, amount}, {
      withCredentials: true
    })
  }

  deleteReview(v_id: string | null, r_id: string | undefined) {
    return this._http.patch(`${this.commonUrl}/user/delete-review/${v_id}`, { r_id }, {
      withCredentials: true
    })
  }

  forgotPass(email: string) {
    return this._http.post(`${this.commonUrl}/user/forgot-password`,  email , {
      withCredentials: true
    })
  }

  resetPass(id: string | null, resetData: any) {
    return this._http.patch(`${this.commonUrl}/user/reset-password/${id}` , resetData , {
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
  //   const map = new google.maps.Map(document.getElementById('autocomplete'), {
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
