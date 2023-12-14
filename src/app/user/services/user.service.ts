import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IReviewModel, IVehicleListRes, IVehicleModel } from '../../interfaces/vehicle.model';
import { IBookingModel } from '../../interfaces/booking.model';
import { IIsBookingCompleted, IUserModel } from '../../interfaces/user.model';
import { IOtpData, IRegistrationData } from '../../interfaces/register.interface';
import { IGoogleUserData } from '../../interfaces/google-login.interface';
import { IChoiceModel } from '../../interfaces/choice.interface';
import { IFilterDetails } from '../../interfaces/filter.interface';
import { IBookingData, IBookingId } from '../../interfaces/booking.interface';
import { IPasswordChange, IProfile } from '../../interfaces/profile.interface';
import { IJwtToken } from '../../interfaces/jwt.interface';
import { ILoginData } from '../../interfaces/login.interface';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  commonUrl = environment.API_URL

  constructor(private _http: HttpClient) { }

  registerUser(userData: IRegistrationData) {
    return this._http.post(`${this.commonUrl}/user/signup`, userData, {
      withCredentials: false
    })
  }

  loginUser(userData: ILoginData): Observable<IJwtToken> {
    return this._http.post<IJwtToken>(`${this.commonUrl}/user/login`, userData, {
      withCredentials: false
    })
  }

  googleLogin(idToken: IGoogleUserData): Observable<IJwtToken> {
    return this._http.post<IJwtToken>(`${this.commonUrl}/user/auth/login`, idToken, {
      withCredentials: false
    })
  }

  verify(otp: IOtpData): Observable<IJwtToken> {
    return this._http.post<IJwtToken>(`${this.commonUrl}/user/verify-otp`, otp, {
      withCredentials: false
    })
  }

  storeChoice(choice: IChoiceModel, placesInRange: string[]) {
    return this._http.put(`${this.commonUrl}/user/store-choice`, { choice, placesInRange }, {
      withCredentials: false
    })
  }

  getVehicle(filters?: IFilterDetails, page?: number): Observable<IVehicleListRes> {
    let params = new HttpParams()
    if (filters) {
      if (filters.fuel) params = params.append('fuel', filters.fuel)
      if (filters.transmission) params = params.append('transmission', filters.transmission)
    }
    return this._http.get<IVehicleListRes>(`${this.commonUrl}/user/vehicles/${page}`, {
      params,
      withCredentials: false
    })
  }

  bookVehicle(bookData: IBookingData): Observable<IBookingId> {
    return this._http.post<IBookingId>(`${this.commonUrl}/user/book-vehicle`, bookData, {
      withCredentials: false
    })
  }

  getBookDetails(id: string | null): Observable<IBookingModel> {
    return this._http.get<IBookingModel>(`${this.commonUrl}/user/booking-details/${id}`, {
      withCredentials: false
    })
  }

  getBookings(): Observable<IBookingModel[]> {
    return this._http.get<IBookingModel[]>(`${this.commonUrl}/user/user-booking`, {
      withCredentials: false
    })
  }

  updateUser(data: IProfile) {
    return this._http.patch(`${this.commonUrl}/user/update-user`, data, {
      withCredentials: false
    })
  }

  updateProfile(file: any, id: string) {
    return this._http.patch(`${this.commonUrl}/user/update-profile/${id}`, file, {
      withCredentials: false
    })
  }

  // a common api all interfaces ([user, host, admin] retrieving single vehicle details) 
  getVehicleDetails(id: string | null): Observable<IVehicleModel> {
    return this._http.get<IVehicleModel>(`${this.commonUrl}/host/vehicle-details/${id}`, {
      withCredentials: false
    })
  }

  changePass(data: IPasswordChange) {
    return this._http.patch(`${this.commonUrl}/user/change-password`, data, {
      withCredentials: false
    })
  }

  getUser(): Observable<IUserModel> {
    return this._http.get<IUserModel>(`${this.commonUrl}/user/getuser`, {
      withCredentials: false
    })
  }

  cancelbooking(reason: string, b_id: string, amount: number, refundvia: string) {
    return this._http.patch(`${this.commonUrl}/user/cancel-booking/${b_id}`, { reason, amount, refundvia }, {
      withCredentials: false
    })
  }

  postReview(review: IReviewModel, v_id: string | null) {
    return this._http.post(`${this.commonUrl}/user/add-review/${v_id}`, review, {
      withCredentials: false
    })
  }

  deleteReview(v_id: string | null, r_id: string | undefined) {
    return this._http.patch(`${this.commonUrl}/user/delete-review/${v_id}`, { r_id }, {
      withCredentials: false
    })
  }

  forgotPass(email: string) {
    return this._http.post(`${this.commonUrl}/user/forgot-password`, email, {
      withCredentials: false
    })
  }

  resetPass(id: string | null, resetData: any) {
    return this._http.patch(`${this.commonUrl}/user/reset-password/${id}`, resetData, {
      withCredentials: false
    })
  }

  isBookingCompleted(vid: string | null): Observable<IIsBookingCompleted> {
    return this._http.post<IIsBookingCompleted>(`${this.commonUrl}/user/isBooked/${vid}`, {
      withCredentials: false
    })
  }

  dfPost() {
    return this._http.post('http://localhost:3000/webhook', {}, {
      withCredentials: false
    })
  }

  logout() {
    return this._http.post(`${this.commonUrl}/user/logout`, {}, {
      withCredentials: false
    })
  }

}
