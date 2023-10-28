import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('userToken')
    let adminToken = localStorage.getItem('adminToken')
    let hostToken = localStorage.getItem('hostToken')
    if (userToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + userToken }
      })
      return next.handle(newRequest)
    } else if (adminToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + adminToken },
      })
      return next.handle(newRequest)
    }
    else if (hostToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + hostToken },
      })
      return next.handle(newRequest)
    }
    let newRequest = request.clone({})
    return next.handle(newRequest)
  }
}
