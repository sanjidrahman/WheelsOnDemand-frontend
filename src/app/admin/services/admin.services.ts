import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';
import { IHostModel } from 'src/app/models/host.model';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { IBookingModel } from 'src/app/models/booking.model';

@Injectable({
  providedIn: 'any'
})
export class AdminService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  loginUser(adminData: any): Observable<any> {
    return this._http.post(`${this.commonUrl}/admin/login`, adminData, {
      withCredentials: false
    })
  }

  getDashboardData() {
    return this._http.get(`${this.commonUrl}/admin/dashboard` , {
      withCredentials: false
    })
  }

  getAllUser(): Observable<IUserModel[]> {
    return this._http.get<IUserModel[]>(`${this.commonUrl}/admin/users`, {
      withCredentials: false
    })
  }

  getAllHost(): Observable<IHostModel[]> {
    return this._http.get<IHostModel[]>(`${this.commonUrl}/admin/hosts`, {
      withCredentials: false
    })
  }

  blockuser(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/user/block/${id}`, null, {
      withCredentials: false
    })
  }

  unblockuser(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/user/unblock/${id}`, null, {
      withCredentials: false
    })
  }

  blockhost(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/host/block/${id}`, null, {
      withCredentials: false
    })
  }

  unblockhost(id: string) {
    return this._http.patch(`${this.commonUrl}/admin/host/unblock/${id}`, null, {
      withCredentials: false
    })
  }

  verifyhost(id: string) {
    return this._http.post(`${this.commonUrl}/admin/host/verify-host/${id}`, null, {
      withCredentials: false
    })
  }

  hostnotverify(id: string, issue: any) {
    return this._http.post(`${this.commonUrl}/admin/host/host-notverify/${id}`, issue, {
      withCredentials: false
    })
  }

  getVehicleDetails(id: string | null) : Observable<IVehicleModel> {
    return this._http.get<IVehicleModel>(`${this.commonUrl}/host/vehicle-details/${id}` , {
      withCredentials: false
    })
  }

  getAllVehicles(page?: number): Observable<IVehicleModel[]> {
    let params = new HttpParams()
    if(page) params = params.append('page', page)
    return this._http.get<IVehicleModel[]>(`${this.commonUrl}/admin/vehicles`, {
      params,
      withCredentials: false
    })
  }

  pagiantion() {
    return this._http.get(`${this.commonUrl}/admin/pagination`)
  }

  addvehicle(data: any) {
    return this._http.post(`${this.commonUrl}/admin/add-vehicle`, data, {
      withCredentials: false
    })
  }

  verifyVehicle(v_id: string, h_id: string) {
    return this._http.patch(`${this.commonUrl}/admin/verify-host-vehicle?vehicleid=${v_id}&hostid=${h_id}`, null, {
      withCredentials: false
    })
  }

  rejectVehicle(issue: string, id: string) {
    return this._http.post(`${this.commonUrl}/admin/reject-host-vehicle/${id}`, issue, {
      withCredentials: false
    })
  }

  editVehicle(data: any, id: string) {
    return this._http.patch(`${this.commonUrl}/admin/edit-vehicle/${id}`, data, {
      withCredentials: false
    })
  }

  deleteVehicleImage(file: string, id: string) {
    return this._http.patch(`${this.commonUrl}/admin/delete-image/${id}?file=${file}`, null, {
      withCredentials: false
    })
  }

  deleteVehicle(id: string) {
    return this._http.delete(`${this.commonUrl}/admin/delete-vehicle/${id}` , {
      withCredentials: false
    })
  }

  getBookings() {
    return this._http.get<IBookingModel[]>(`${this.commonUrl}/admin/all-bookings` , {
      withCredentials: false
    })
  }

   // a common api for all interfaces ([user, host, admin] for booking details)
   getBookDetails(id: string | null) {
    return this._http.get<IBookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
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
    return this._http.post(`${this.commonUrl}/admin/logout`, {}, {
      withCredentials: false
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
