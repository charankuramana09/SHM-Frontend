import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  authorities: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isSuperAdminSubject = new BehaviorSubject<boolean>(this.getSuperAdminStatus());
  public isSuperAdmin$ = this.isSuperAdminSubject.asObservable();
  private rolesSubject = new BehaviorSubject<string[]>(this.getRoles());
  public roles$ = this.rolesSubject.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(loginData: { email: string, password: string }): Observable<any> {
      return this.http.post<{ jwtToken: string, authorities: string[], firstName: string, lastName: string }>(`${this.apiUrl}/login`, loginData).pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('jwtToken', response.jwtToken);
          localStorage.setItem('authorities', JSON.stringify(response.authorities));
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('lastName', response.lastName);

          const isSuperAdmin = response.authorities.includes('ROLE_SUPERADMIN');
          localStorage.setItem('isSuperAdmin', JSON.stringify(isSuperAdmin));
          this.rolesSubject.next(response.authorities); // Update roles
          this.isSuperAdminSubject.next(isSuperAdmin);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }
  private getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem('authorities');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('authorities');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('isSuperAdmin');
      this.isAuthenticatedSubject.next(false);
      this.isSuperAdminSubject.next(false);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('jwtToken');
  }

  private getSuperAdminStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const status = localStorage.getItem('isSuperAdmin');
      return status ? JSON.parse(status) : false;
    }
    return false;
  }
}
