import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
<<<<<<< HEAD
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
=======
import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';
>>>>>>> rohith

const routes: Routes = [
  { path: '', component: HostelMembersDashboardComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
<<<<<<< HEAD
  { path: 'login-page', component: LoginPageComponent },
  { path: 'payment-page', component: PaymentFormComponent },
=======
  { path: 'company-invoice', component: CompanyInvoiceGenerationComponent}
>>>>>>> rohith
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
