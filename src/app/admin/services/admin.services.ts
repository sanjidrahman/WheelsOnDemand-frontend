import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';
import { hostModel } from 'src/app/models/host.model';
import { vehicleModel } from 'src/app/models/vehicle.model';

@Injectable({
  providedIn: 'any'
})
export class AdminService {

  commonUrl = environment.API_URL

  constructor(private http: HttpClient) { }

  loginUser(adminData: any): Observable<any> {
    return this.http.post(`${this.commonUrl}/admin/login`, adminData, {
      withCredentials: true
    })
  }

  getAllUser(): Observable<userModel[]> {
    return this.http.get<userModel[]>(`${this.commonUrl}/admin/users`, {
      withCredentials: true
    })
  }

  getAllHost(): Observable<hostModel[]> {
    return this.http.get<hostModel[]>(`${this.commonUrl}/admin/hosts`, {
      withCredentials: true
    })
  }

  blockuser(id: string) {
    return this.http.patch(`${this.commonUrl}/admin/user/block/${id}`, null, {
      withCredentials: true
    })
  }

  unblockuser(id: string) {
    return this.http.patch(`${this.commonUrl}/admin/user/unblock/${id}`, null, {
      withCredentials: true
    })
  }

  blockhost(id: string) {
    return this.http.patch(`${this.commonUrl}/admin/host/block/${id}`, null, {
      withCredentials: true
    })
  }

  unblockhost(id: string) {
    return this.http.patch(`${this.commonUrl}/admin/host/unblock/${id}`, null, {
      withCredentials: true
    })
  }

  verifyhost(id: string) {
    return this.http.post(`${this.commonUrl}/admin/host/verify-host/${id}`, null, {
      withCredentials: true
    })
  }

  hostnotverify(id: string, issue: any) {
    return this.http.post(`${this.commonUrl}/admin/host/host-notverify/${id}`, issue, {
      withCredentials: true
    })
  }

  getAllVehicles() : Observable<vehicleModel[]> {
    return this.http.get<vehicleModel[]>(`${this.commonUrl}/admin/vehicles` , {
      withCredentials : true
    })
  }

}
