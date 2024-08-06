import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import { SharedServiceService } from '../services/shared-service.service';

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

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private sharedService: SharedServiceService) { }

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
        this.openDialog('Click the link to navigate to the payment page. After a successful payment, copy your payment ID to check your payment status.', false);
      }, error => {
        console.error('Error creating payment link:', error);
        this.openDialog('Error creating payment link', false);
      });
  }

  getPaymentStatus(paymentId: string, userId: string) {
    let params = new HttpParams()
      .set('paymentId', paymentId)
      .set('userId', userId);

    this.http.put<any>(`${this.getstatusUrl}/updatePayment`, null, { params })
      .subscribe(response => {
        this.paymentStatus = response.update;
        this.openDialog('Payment status updated', true);
        this.sharedService.triggerUserDetailsFetch();
      }, error => {
        console.error('Error fetching payment status:', error);
        this.openDialog('Error fetching payment status', true);
      });
  }

  openDialog(message: string, navigate: boolean): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: this.paymentStatus, message: message } 
    });
    if (navigate) {
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/user-profile']); 
      });
    }
  }
}
