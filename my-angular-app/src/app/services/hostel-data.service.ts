import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelDataService {
  hostelName: string = '';

  setHostelName(name: string) {
    this.hostelName = name;
  }

  getHostelName() {
    return this.hostelName;
  }


  private apiUrl = 'http://localhost:8081/admin/filter'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  getUserDetailsByFrequencyType(frequencyType: string, hostelName: string): Observable<Object[]> {
    let params = new HttpParams();
    params = params.append('frequencyType', frequencyType);
    params = params.append('hostelName', hostelName);

    return this.http.get<Object[]>(this.apiUrl, { params });
  }
}
