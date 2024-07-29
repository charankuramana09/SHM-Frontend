import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface PaymentHistory {
  date: string;
  amount: number;
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {
  private apiUrl = 'http://localhost:8080/api/hostel';

  constructor(private http: HttpClient) {}

  getPaymentHistory(memberId: number): Observable<PaymentHistory[]> {
    // Replace with actual API call
    return this.http.get<PaymentHistory[]>(`${this.apiUrl}/members/${memberId}/payment-history`);
  }

  // Dummy data for testing
  getPaymentHistoryDummy(): Observable<PaymentHistory[]> {
    const paymentHistories: PaymentHistory[] = [
      { date: '2023-01-01', amount: 5000, status: 'Paid' },
      { date: '2023-02-01', amount: 5000, status: 'Paid' },
      { date: '2023-03-01', amount: 5000, status: 'Pending' }
    ];
    return of(paymentHistories);
  }
}
