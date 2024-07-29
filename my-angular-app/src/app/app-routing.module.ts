import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const routes: Routes = [
  { path: '', component: HostelMembersDashboardComponent },
  { path: 'payment-history', component: PaymentHistoryComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
