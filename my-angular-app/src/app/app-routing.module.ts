import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';

const routes: Routes = [
  { path: '', component: HostelMembersDashboardComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'company-invoice', component: CompanyInvoiceGenerationComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
