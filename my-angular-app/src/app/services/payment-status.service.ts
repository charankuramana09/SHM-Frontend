import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDetails } from './payment-details.model'; // Import the model

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {
  private baseUrl = 'http://localhost:8085/payment';

  constructor(private http: HttpClient) {}

  getAllPaymentDetails(): Observable<PaymentDetails[]> {
    return this.http.get<PaymentDetails[]>(`${this.baseUrl}/all`);
  }
}
