import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private superAdminStatus = new BehaviorSubject<boolean>(false);
  superAdminStatus$ = this.superAdminStatus.asObservable();

  private fetchDataSubject = new Subject<void>();
  fetchData$ = this.fetchDataSubject.asObservable();
  setSuperAdminStatus(status: boolean): void {
    this.superAdminStatus.next(status);
  }
  triggerDataFetch(): void {
    this.fetchDataSubject.next();
  }
}
