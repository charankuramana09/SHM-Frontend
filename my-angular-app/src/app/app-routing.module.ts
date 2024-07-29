import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  { path: '', component: HostelMembersDashboardComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'payment-page', component: PaymentFormComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
