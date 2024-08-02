import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostelMember } from '../models/HostelMember';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
private membersData: HostelMember[] = [];
constructor() { }
setUserProfiles(data: HostelMember[]): void {
  this.membersData = data;
}

getUserProfiles(): Observable<HostelMember[]> {
  return of(this.membersData);
}
}
