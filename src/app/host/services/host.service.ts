import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingModel } from 'src/app/interfaces/booking.model';
import { IHostModel } from 'src/app/interfaces/host.model';
import { IVehicleListRes, IVehicleModel } from 'src/app/interfaces/vehicle.model';
import { environment } from 'src/environments/environment.development';
import { IGoogleUserData } from '../../interfaces/google-login.interface';
import { ILoginData } from '../../interfaces/login.interface';
import { IOtpData, IRegistrationData } from '../../interfaces/register.interface';
import { IPasswordChange, IProfile } from '../../interfaces/profile.interface';
import { IJwtToken } from '../../interfaces/jwt.interface';
import { IDashboardData } from '../../interfaces/host-dashboard.interface';

@Injectable()
export class HostService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  registerHost(userData: IRegistrationData) {
    return this._http.post(`${this.commonUrl}/host/signup`, userData, {
      withCredentials: false
    });
  }

  loginHost(userData: ILoginData): Observable<IJwtToken> {
    return this._http.post<IJwtToken>(`${this.commonUrl}/host/login`, userData, {
      withCredentials: false
    });
  }

  googleLogin(idToken: IGoogleUserData): Observable<IJwtToken> {
    return this._http.post<IJwtToken>(`${this.commonUrl}/host/auth/login`, idToken, {
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

  getDashboard(): Observable<IDashboardData> {
    return this._http.get<IDashboardData>(`${ this.commonUrl }/host/dashboard` , {
      withCredentials: false
    })
  }

  verifyHost(otp: IOtpData): Observable<IJwtToken> {
    return this._http.post<IJwtToken> (`${this.commonUrl}/host/verify-otp`, otp, {
      withCredentials: false
    });
  }

  upload(file: any, id: string) {
    return this._http.post(`${this.commonUrl}/host/upload-doc/${id}`, file, {
      withCredentials: false
    });
  }

  uploadProfile(file: any, id: string) {
    return this._http.post(`${this.commonUrl}/host/upload-profile/${id}`, file, {
      withCredentials: false
    })
  }

  hostdetails(): Observable<IHostModel> {
    return this._http.get<IHostModel>(`${this.commonUrl}/host/host-details`, {
      withCredentials: false
    })
  }

  updatehost(data: IProfile) {
    return this._http.patch(`${this.commonUrl}/host/update-host`, data, {
      withCredentials: false
    })
  }

  changePass(data: IPasswordChange) {
    return this._http.patch(`${this.commonUrl}/host/change-pass`, data, {
      withCredentials: false
    })
  }

  addvehicle(data: any, hostid: string) {  
    return this._http.post(`${this.commonUrl}/host/add-vehicle/${hostid}`, data, {
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

  hostVehicle(page?: number) : Observable<IVehicleListRes> {
    let params = new HttpParams()
    if(page) params = params.append('page', page)
    return this._http.get<IVehicleListRes>(`${this.commonUrl}/host/host-vehicles` , {
      params,
      withCredentials: false
    })
  }

  hostBooking(): Observable<IBookingModel[]> {
    return this._http.get<IBookingModel[]>(`${this.commonUrl}/host/host-bookings`, {
      withCredentials: false
    })
  }

  // a common api for all interfaces ([user, host, admin] for booking details)
  getBookDetails(id: string | null): Observable<IBookingModel> {
    return this._http.get<IBookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
      withCredentials: false
    })
  }


  // a common api all interfaces ([user, host, admin] retrieving single vehicle details) 
  getVehicleDetails(id: string | null): Observable<IVehicleModel> {
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
