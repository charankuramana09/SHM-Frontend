import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostelMember } from '../models/HostelMember';
import { HostelDataService } from './hostel-data.service';




@Injectable({
  providedIn: 'root'
})
export class HostelService {
  hostelName: string;
  constructor(private http: HttpClient, hostelDataService:HostelDataService) {
    this.hostelName = hostelDataService.getHostelName();
   
  }
 
  private apiUrl = 'http://localhost:8081/admin/filter/hostelname';

  

  getHostelMembers(): Observable<HostelMember[]> {
    const params = new HttpParams().set('hostelName', this.hostelName)
    return this.http.get<HostelMember[]>(this.apiUrl, { params });
    
  }
}
