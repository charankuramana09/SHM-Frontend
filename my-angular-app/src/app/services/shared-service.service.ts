import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private superAdminStatus = new BehaviorSubject<boolean>(false);
  superAdminStatus$ = this.superAdminStatus.asObservable();

  setSuperAdminStatus(status: boolean): void {
    this.superAdminStatus.next(status);
  }
}
