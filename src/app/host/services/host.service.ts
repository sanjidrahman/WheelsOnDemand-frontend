import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingModel } from 'src/app/models/booking.model';
import { IHostModel } from 'src/app/models/host.model';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HostService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  registerHost(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/signup`, userData, {
      withCredentials: false
    });
  }

  loginHost(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/login`, userData, {
      withCredentials: false
    });
  }

  googleLogin(idToken: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/auth/login`, idToken, {
      withCredentials: false
    });
  }

  forgotPass(email: string) {
    return this._http.post(`${this.commonUrl}/host/forgot-password`,  email , {
      withCredentials: false
    })
  }

  resetPass(id: string | null, resetData: any) {
    return this._http.patch(`${this.commonUrl}/host/reset-password/${id}` , resetData , {
      withCredentials: false
    })
  }

  getDashboard() {
    return this._http.get(`${ this.commonUrl }/host/dashboard` , {
      withCredentials: false
    })
  }

  verifyHost(otp: any) {
    return this._http.post(`${this.commonUrl}/host/verify-otp`, otp, {
      withCredentials: false
    });
  }

  upload(file: any, id: string) {
    return this._http.post(`${this.commonUrl}/host/upload-doc/${id}`, file, {
      withCredentials: false
    });
  }

  uploadProfile(file: any) {
    return this._http.post(`${this.commonUrl}/host/upload-profile`, file, {
      withCredentials: false
    })
  }

  hostdetails(): Observable<IHostModel> {
    return this._http.get<IHostModel>(`${this.commonUrl}/host/host-details`, {
      withCredentials: false
    })
  }

  updatehost(data: any) {
    return this._http.patch(`${this.commonUrl}/host/update-host`, data, {
      withCredentials: false
    })
  }

  changePass(data: any) {
    return this._http.patch(`${this.commonUrl}/host/change-pass`, data, {
      withCredentials: false
    })
  }

  addvehicle(data: any) {  
    return this._http.post(`${this.commonUrl}/host/add-vehicle`, data, {
      withCredentials: false
    })
  }

  editVehicle(data: any, id: string) {
    return this._http.patch(`${this.commonUrl}/host/edit-vehicle/${id}`, data, {
      withCredentials: false
    })
  }

  deleteVehicleImage(file: string, id: string) {
    return this._http.patch(`${this.commonUrl}/host/delete-image/${id}?file=${file}`, null, {
      withCredentials: false
    })
  }

  deleteVehicle(id: string) {
    return this._http.delete(`${this.commonUrl}/host/delete-vehicle/${id}` , {
      withCredentials: false
    })
  }

  hostVehicle(page?: number) : Observable<IVehicleModel[]> {
    let params = new HttpParams()
    if(page) params = params.append('page', page)
    return this._http.get<IVehicleModel[]>(`${this.commonUrl}/host/host-vehicles` , {
      params,
      withCredentials: false
    })
  }

  hostBooking() {
    return this._http.get<IBookingModel[]>(`${this.commonUrl}/host/host-bookings`, {
      withCredentials: false
    })
  }

  // a common api for all interfaces ([user, host, admin] for booking details)
  getBookDetails(id: string | null) {
    return this._http.get<IBookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
      withCredentials: false
    })
  }


  // a common api all interfaces ([user, host, admin] retrieving single vehicle details) 
  getVehicleDetails(id: string | null) : Observable<IVehicleModel> {
    return this._http.get<IVehicleModel>(`${this.commonUrl}/host/vehicle-details/${id}` , {
      withCredentials: false
    })
  }

  // a common api in admin, host (changing the status of bookings)
  updateBookingStatus(status: string, b_id: string | null) {
    return this._http.patch(`${this.commonUrl}/host/edit-booking-status/${b_id}` , {status}, {
      withCredentials: false
    })
  }

  logout() {
    return this._http.post(`${this.commonUrl}/host/logout`, {}, {
      withCredentials: false
    });
  }

  
}
