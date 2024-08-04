import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostelMember } from '../models/HostelMember';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private membersData: HostelMember[] = [];
  private apiUrl = 'http://localhost:8084/user'; 

  constructor(private http: HttpClient) { }

  setUserProfiles(data: HostelMember[]): void {
    this.membersData = data;
  }

  

  getUserByEmail(email: string): Observable<HostelMember[]> {
    const url = `${this.apiUrl}/getUserData/${email}`;
    return this.http.get<HostelMember[]>(url);
  }

  getUserDataBoolean(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/getUserDataBoolean/${email}`;
    return this.http.get<boolean>(url);
  }
}


