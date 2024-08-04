import { Component, OnInit } from '@angular/core';
import { PaymentStatusService } from '../services/payment-status.service';
import { PaymentDetails } from '../services/payment-details.model';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  paymentDetails: PaymentDetails[] = [];

  constructor(private paymentStatusService: PaymentStatusService) {}

  ngOnInit(): void {
    this.paymentStatusService.getAllPaymentDetails().subscribe(
      (data: PaymentDetails[]) => {
        this.paymentDetails = data;
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }
}
