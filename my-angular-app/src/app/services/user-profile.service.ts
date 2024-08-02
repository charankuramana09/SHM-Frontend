import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostelMember } from '../models/HostelMember';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private membersData: HostelMember[] = [];
  private apiUrl = 'http://localhost:8084/user/getId/6'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  setUserProfiles(data: HostelMember[]): void {
    this.membersData = data;
  }

  getUserProfiles(): Observable<HostelMember[]> {
    return this.http.get<HostelMember[]>(this.apiUrl);
  }
}
