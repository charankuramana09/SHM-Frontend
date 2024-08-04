import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  private apiUrl = 'http://localhost:8081/admin/filter/hostelname'; // Ensure this URL is correct

  constructor(private http: HttpClient) {}

  getHostelMembers(hostelName: string, frequencyType: string): Observable<Map<string, any>[]> {
    let params = new HttpParams()
      .set('frequencyType', frequencyType)
      .set('hostelName', hostelName);

    return this.http.get<Map<string, any>[]>(this.apiUrl, { params });
  }
}
