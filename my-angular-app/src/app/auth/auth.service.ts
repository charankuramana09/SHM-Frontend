
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  private apiUrl = 'http://localhost:8081/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string, authorities: string[], firstName: string, lastName: string }>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('authorities', JSON.stringify(response.authorities));
        localStorage.setItem('firstName', response.firstName);
        localStorage.setItem('lastName', response.lastName);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('authorities');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');  
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  
  private hasToken(): boolean {
    return this.isBrowser() && !!localStorage.getItem('jwtToken');
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('jwtToken') : null;
  }
}