import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8083/admin';

  constructor(private http: HttpClient) { }

  getFilteredData(frequencyType: string, hostelName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter?frequencyType=${frequencyType}&hostelName=${hostelName}`);
  }
}
