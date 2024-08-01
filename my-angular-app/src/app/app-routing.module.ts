import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignupFormComponent },
  // { path: 'dashboard', component: HostelMembersDashboardComponent,canActivate:[AuthGuard] },
  // { path: 'payment-history', component: PaymentHistoryComponent,canActivate:[AuthGuard] },
  // { path: 'payment-page', component: PaymentFormComponent,canActivate:[AuthGuard] },

  { path: 'company-invoice', component: CompanyInvoiceGenerationComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
