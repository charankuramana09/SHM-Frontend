// In auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedEndpoints = ['/signup', '/login'];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
      return next.handle(req);
    }
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ${token}'
        }
      });

      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}