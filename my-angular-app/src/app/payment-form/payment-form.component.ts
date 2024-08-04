import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  paymentLink: string | null = null;
  paymentStatus: any = null;
  private backendUrl = 'http://localhost:8085/payment';
  private getstatusUrl = 'http://localhost:8082/edge';

  constructor(private http: HttpClient) {}

  onSubmit(paymentForm: any) {
    const formData = paymentForm.value;

    let params = new HttpParams()
      .set('userId', formData.userId)
      .set('userName', formData.userName)
      .set('phone', formData.phone)
      .set('amount', formData.amount);

    this.http.post(`${this.backendUrl}/createLink`, null, { params, responseType: 'text' })
      .subscribe(response => {
        this.paymentLink = response;
      }, error => {
        console.error('Error creating payment link:', error);
      });
  }

  getPaymentStatus(paymentId: string, userId: string) {
    let params = new HttpParams()
      .set('paymentId', paymentId)
      .set('userId', userId);

    this.http.put<any>(`${this.getstatusUrl}/updatePayment`, null, { params })
      .subscribe(response => {
        this.paymentStatus = response;
      }, error => {
        console.error('Error fetching payment status:', error);
      });
  }
}
