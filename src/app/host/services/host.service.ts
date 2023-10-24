import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hostModel } from 'src/app/models/host.model';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HostService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  registerHost(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/signup`, userData, {
      withCredentials: true
    });
  }

  loginHost(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/login`, userData, {
      withCredentials: true
    });
  }

  googleLogin(idToken: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/host/auth/login`, idToken, {
      withCredentials: true
    });
  }

  verifyHost(otp: any) {
    return this._http.post(`${this.commonUrl}/host/verify-otp`, otp, {
      withCredentials: true
    });
  }

  logout() {
    return this._http.post(`${this.commonUrl}/host/logout`, {}, {
      withCredentials: true
    });
  }

  upload(file: any, id: string) {
    return this._http.post(`${this.commonUrl}/host/upload-doc/${id}`, file, {
      withCredentials: true
    });
  }

  uploadProfile(file: any) {
    return this._http.post(`${this.commonUrl}/host/upload-profile`, file, {
      withCredentials: true
    })
  }

  hostdetails(): Observable<hostModel> {
    return this._http.get<hostModel>(`${this.commonUrl}/host/host-details`, {
      withCredentials: true
    })
  }

  updatehost(data: any) {
    return this._http.patch(`${this.commonUrl}/host/update-host`, data, {
      withCredentials: true
    })
  }

  changePass(data: any) {
    return this._http.patch(`${this.commonUrl}/host/change-pass`, data, {
      withCredentials: true
    })
  }

  addvehicle(data: any) {  
    return this._http.post(`${this.commonUrl}/host/add-vehicle`, data, {
      withCredentials: true
    })
  }
}
