// In auth.interceptor.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private excludedEndpoints = ['/register', '/login'];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
      return next.handle(req);
    }

    if (this.isBrowser) {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(cloned);
      }
    }

    return next.handle(req);
  }

  // private excludedEndpoints = ['/register', '/login'];
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
  //     return next.handle(req);
  //   }
  //   const token = localStorage.getItem('jwtToken');

  //   if (token) {
  //     const cloned = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${token}`)
  //     });

  //     return next.handle(cloned);
  //   } else {
  //     return next.handle(req);
  //   }
  // }
}