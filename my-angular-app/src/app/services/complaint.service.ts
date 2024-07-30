import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://your-backend-url/api/complaints';

  constructor(private http: HttpClient) {}

  submitComplaint(complaintData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, complaintData);
  }
}
