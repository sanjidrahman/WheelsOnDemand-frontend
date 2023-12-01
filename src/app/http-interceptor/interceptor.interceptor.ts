import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private _spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('userToken')
    let adminToken = localStorage.getItem('adminToken')
    let hostToken = localStorage.getItem('hostToken')
    this._spinner.show();
    if (userToken) {
      let newRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + userToken,
          'Sample': 'my-auth-token'
        })
      })
      return next.handle(newRequest).pipe(
        finalize(() => this._spinner.hide())
      );
    } else if (adminToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + adminToken },
      })
      return next.handle(newRequest).pipe(
        finalize(() => this._spinner.hide())
      )
    }
    else if (hostToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + hostToken },
      })
      return next.handle(newRequest).pipe(
        finalize(() => this._spinner.hide())
      );
    }
    let newRequest = request.clone({})
    return next.handle(newRequest).pipe(
      finalize(() => this._spinner.hide())
    );
  }
}
