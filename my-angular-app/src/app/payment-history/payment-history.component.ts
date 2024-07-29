import { Component, OnInit } from '@angular/core';
import { PaymentHistory, PaymentHistoryService } from '../services/payment-history.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent  implements OnInit {
  paymentHistory: PaymentHistory[] = [];

  constructor(private route: ActivatedRoute, private paymentHistoryService: PaymentHistoryService) {}

  ngOnInit(): void {
    const memberId = +this.route.snapshot.paramMap.get('id');
    
    // this.paymentHistoryService.getPaymentHistoryDummy(memberId).subscribe(
      this.paymentHistoryService.getPaymentHistoryDummy().subscribe( //remove when connect backend
      data => this.paymentHistory = data,
      error => console.error('Error fetching payment history', error)
    );
  }
}
