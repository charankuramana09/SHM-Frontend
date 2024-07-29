import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface HostelMember {
  name: string;
  mobile: string;
  joiningDate: string;
  paidAmount: number;
  pendingFee: number;
  activePaymentHistory: string;
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class HostelService {
  // private apiUrl = 'http://localhost:8080/api/hostel/members';

  // constructor(private http: HttpClient) {}

  // getHostelMembers(): Observable<HostelMember[]> {
  //   return this.http.get<HostelMember[]>(this.apiUrl);
  // }

  //  Testing with dummy data
  constructor() {}

  getHostelMembers(): Observable<HostelMember[]> {
    // Dummy data with status
    const members: HostelMember[] = [
      { name: 'John Doe', mobile: '9123456789', joiningDate: '2023-01-10', paidAmount: 6000, pendingFee: 20000, activePaymentHistory: 'Paid in full', status: 'Active' },
      { name: 'Jane Smith', mobile: '9876543210', joiningDate: '2023-02-15', paidAmount: 4000, pendingFee: 25000, activePaymentHistory: 'Partial payment', status: 'Inactive' },
      { name: 'Michael Johnson', mobile: '9123456781', joiningDate: '2023-03-20', paidAmount: 5000, pendingFee: 18000, activePaymentHistory: 'Paid in full', status: 'Vacated' },
      { name: 'Emily Davis', mobile: '9876543211', joiningDate: '2023-04-10', paidAmount: 7000, pendingFee: 15000, activePaymentHistory: 'Overdue', status: 'Active' },
      { name: 'Robert Brown', mobile: '9123456782', joiningDate: '2023-05-05', paidAmount: 3000, pendingFee: 22000, activePaymentHistory: 'Paid in full', status: 'Inactive' }
    ];

    return of(members);
  }
}
