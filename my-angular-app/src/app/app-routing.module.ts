import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignupFormComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: HostelMembersDashboardComponent },
      { path: 'expenses', component: ExpenseFormComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'payment-page', component: PaymentFormComponent},
      { path: 'payment-history', component: PaymentHistoryComponent },
      { path: 'company-invoice', component: CompanyInvoiceGenerationComponent },
      { path: 'complaint', component: UserRegistrationComponent },
      { path: 'queries', component: QuarysComplaintsComponent },
      { path: 'dashboard', component: HostelMembersDashboardComponent}
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
