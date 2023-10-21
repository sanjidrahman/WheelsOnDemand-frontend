import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  upload(file: any , id : string) {
    return this._http.post(`${this.commonUrl}/host/upload-single/${id}`, file, {
      withCredentials: true
    });
  }
}
