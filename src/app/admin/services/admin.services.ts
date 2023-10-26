import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { userModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';
import { hostModel } from 'src/app/models/host.model';
import { vehicleModel } from 'src/app/models/vehicle.model';

@Injectable({
  providedIn: 'any'
})
export class AdminService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  loginUser(adminData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/admin/login`, adminData, {
      withCredentials: true
    })
  }

  getAllUser(): Observable<userModel[]> {
    return this._http.get<userModel[]>(`${this.commonUrl}/admin/users`, {
      withCredentials: true
    })
  }

  getAllHost(): Observable<hostModel[]> {
    return this._http.get<hostModel[]>(`${this.commonUrl}/admin/hosts`, {
      withCredentials: true
    })
  }

  blockuser(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/user/block/${id}`, null, {
      withCredentials: true
    })
  }

  unblockuser(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/user/unblock/${id}`, null, {
      withCredentials: true
    })
  }

  blockhost(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/host/block/${id}`, null, {
      withCredentials: true
    })
  }

  unblockhost(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/host/unblock/${id}`, null, {
      withCredentials: true
    })
  }

  verifyhost(id: string) {
    return this._http.post(`${this.commonUrl}/admin/host/verify-host/${id}`, null, {
      withCredentials: true
    })
  }

  hostnotverify(id: string, issue: any) {
    return this._http.post(`${this.commonUrl}/admin/host/host-notverify/${id}`, issue, {
      withCredentials: true
    })
  }

  getAllVehicles(): Observable<vehicleModel[]> {
    return this._http.get<vehicleModel[]>(`${this.commonUrl}/admin/vehicles`, {
      withCredentials: true
    })
  }

  addvehicle(data: any) {
    console.log(data);
    return this._http.post(`${this.commonUrl}/admin/add-vehicle`, data, {
      withCredentials: true
    })
  }

  verifyVehicle(v_id: string, h_id: string) {
    return this._http.patch(`${this.commonUrl}/admin/verify-host-vehicle?vehicleid=${v_id}&hostid=${h_id}`, null, {
      withCredentials: true
    })
  }

  rejectVehicle(issue: string, id: string) {
    return this._http.post(`${this.commonUrl}/admin/reject-host-vehicle/${id}`, issue, {
      withCredentials: true
    })
  }

  editVehicle(data: any, id: string) {
    return this._http.patch(`${this.commonUrl}/admin/edit-vehicle/${id}`, data, {
      withCredentials: true
    })
  }

  deleteVehicleImage(file: string, id: string) {
    return this._http.patch(`${this.commonUrl}/admin/delete-image/${id}?file=${file}`, null, {
      withCredentials: true
    })
  }

  deleteVehicle(id: string) {
    return this._http.delete(`${this.commonUrl}/admin/delete-vehicle/${id}` , {
      withCredentials: true
    })
  }

  logout() {
    return this._http.post(`${this.commonUrl}/admin/logout`, {}, {
      withCredentials: true
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
