import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthGuard } from './auth/auth.guard';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuarysComplaintsComponent } from './quarys-complaints/quarys-complaints.component';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
import { HostelFeeComponent } from './hostel-fee/hostel-fee.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormSelectorComponent } from './form-selector/form-selector.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignupFormComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: HostelMembersDashboardComponent,canActivate:[AuthGuard]  },
      { path: 'fee', component: HostelFeeComponent },
      { path: 'expenses', component: FormSelectorComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate:[AuthGuard] },
      { path: 'payment-page', component: PaymentFormComponent},
      // { path: 'payment-history', component: PaymentHistoryComponent },
      { path: 'payment-history', component: PaymentStatusComponent },
      { path: 'company-invoice', component: CompanyInvoiceGenerationComponent },
      { path: 'registration', component: UserRegistrationComponent},
      { path: 'complaint', component: ComplaintFormComponent },
      { path: 'queries', component: QuarysComplaintsComponent },
      {path: 'app-main', component: MainComponent },
      {path: 'user-profile', component: UserProfileComponent },
      {path: 'nav-bar', component: NavbarComponent }
      // Other routes requiring the navbar
    ]
  },
  // Other routes
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
