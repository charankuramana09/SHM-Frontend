import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private superAdminStatus = new BehaviorSubject<boolean>(false);
  private userStatus = new BehaviorSubject<boolean>(false);
  superAdminStatus$ = this.superAdminStatus.asObservable();
  UserStatus$ = this.userStatus.asObservable();
  private fetchDataSubject = new Subject<void>();
  fetchData$ = this.fetchDataSubject.asObservable();

  private fetchUserDetailsSubject = new Subject<void>();
  fetchUserDetailsSubject$ = this.fetchUserDetailsSubject.asObservable();

  private userRegistrationStatus =new BehaviorSubject<boolean>(false);
  userRegistrationStatusStatus$ = this.userRegistrationStatus.asObservable();

  setuserRegistrationStatus(status: boolean): void {
    this.userRegistrationStatus.next(status);
  }

  setSuperAdminStatus(status: boolean): void {
    this.superAdminStatus.next(status);
  }
  setUserStatus(status: boolean): void {
    this.userStatus.next(status);
  }

  triggerDataFetch(): void {
    this.fetchDataSubject.next();
  }

  triggerUserDetailsFetch(): void {
    this.fetchUserDetailsSubject.next();
  }
}
