// import { Component, OnInit } from '@angular/core';
// import { PaymentHistory, PaymentHistoryService } from '../services/payment-history.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-payment-history',
//   templateUrl: './payment-history.component.html',
//   styleUrl: './payment-history.component.scss'
// })
// export class PaymentHistoryComponent  implements OnInit {
//   paymentHistory: PaymentHistory[] = [];

//   constructor(private route: ActivatedRoute, private paymentHistoryService: PaymentHistoryService) {}

//   ngOnInit(): void {
//     const memberId = +this.route.snapshot.paramMap.get('id');

//     // this.paymentHistoryService.getPaymentHistoryDummy(memberId).subscribe(
//       this.paymentHistoryService.getPaymentHistoryDummy().subscribe( //remove when connect backend
//       data => this.paymentHistory = data,
//       error => console.error('Error fetching payment history', error)
//     );
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { PaymentHistory, PaymentHistoryService } from '../services/payment-history.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-payment-history',
//   templateUrl: './payment-history.component.html',
//   styleUrls: ['./payment-history.component.scss']
// })
// export class PaymentHistoryComponent implements OnInit {
//   paymentHistory: PaymentHistory[] = [];
//   filteredPaymentHistory: PaymentHistory[] = [];
//   statuses: string[] = ['All', 'Paid', 'Pending'];
//   selectedStatus: string = 'All';

//   constructor(private route: ActivatedRoute, private paymentHistoryService: PaymentHistoryService) {}

//   ngOnInit(): void {
//     const memberId = +this.route.snapshot.paramMap.get('id');

//     // this.paymentHistoryService.getPaymentHistoryDummy(memberId).subscribe(
//     this.paymentHistoryService.getPaymentHistoryDummy().subscribe( // remove when connecting backend
//       data => {
//         this.paymentHistory = data;
//         this.filteredPaymentHistory = data;
//       },
//       error => console.error('Error fetching payment history', error)
//     );
//   }

//   filterPaymentHistory(): void {
//     if (this.selectedStatus === 'All') {
//       this.filteredPaymentHistory = this.paymentHistory;
//     } else {
//       this.filteredPaymentHistory = this.paymentHistory.filter(payment => payment.status === this.selectedStatus);
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { PaymentHistory, PaymentHistoryService } from '../services/payment-history.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  paymentHistory: PaymentHistory[] = [];
  filteredPaymentHistory: PaymentHistory[] = [];
  statuses: string[] = ['All', 'Paid', 'Pending'];
  selectedStatus: string = 'All';

  constructor(private route: ActivatedRoute, private paymentHistoryService: PaymentHistoryService) { }

  ngOnInit(): void {
    const memberId = +this.route.snapshot.paramMap.get('id');

    this.paymentHistoryService.getPaymentHistoryDummy().subscribe( // remove when connecting backend
      data => {
        this.paymentHistory = data;
        this.filteredPaymentHistory = data;
      },
      error => console.error('Error fetching payment history', error)
    );
  }

  filterPaymentHistory(): void {
    if (this.selectedStatus === 'All') {
      this.filteredPaymentHistory = this.paymentHistory;
    } else {
      this.filteredPaymentHistory = this.paymentHistory.filter(payment => payment.status === this.selectedStatus);
    }
  }

  downloadPDF(): void {
    const element = document.getElementById('payment-history-container');
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('payment-history.pdf');
    });
  }
}

