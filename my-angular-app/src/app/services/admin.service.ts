  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface AdminData {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  paymentHistory: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/details'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAdminDetails(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>(this.apiUrl);
  }
}
