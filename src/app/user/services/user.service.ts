import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';

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
    } )
  }

  getVehicle() {
    return this._http.get<vehicleModel[]>(`${this.commonUrl}/user/vehicles`, {
      withCredentials: true
    })
  }

  logout() {
    return this._http.post(`${this.commonUrl}/user/logout`, {}, {
      withCredentials: true
    })
  }
}
