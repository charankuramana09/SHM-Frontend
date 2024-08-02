import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { CaptchaService } from './services/captcha.service';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GroceryFormComponent } from './grocery-form/grocery-form.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuarysComplaintsComponent } from './quarys-complaints/quarys-complaints.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MonthlyRentFormComponent } from './monthly-rent-form/monthly-rent-form.component';
import { EmployeeSalariesComponent } from './employee-salaries/employee-salaries.component';
import { PowerBillFormComponent } from './power-bill-form/power-bill-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { HostelFeeComponent } from './hostel-fee/hostel-fee.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    CompanyInvoiceGenerationComponent,
    HostelMembersDashboardComponent,
    PaymentHistoryComponent,
    ComplaintFormComponent,
    SignupFormComponent,
    SignupScreenComponent,
    LoginPageComponent,
    PaymentFormComponent,
    UserRegistrationComponent,
    CaptchaComponent,
    MathCaptchaComponent,
    ComplaintFormComponent,
    GroceryFormComponent,
    FooterComponent,
    HeaderComponent,
    AdminDashboardComponent,
    UserProfileComponent,
    QuarysComplaintsComponent,
    MonthlyRentFormComponent,
    EmployeeSalariesComponent,
    PowerBillFormComponent,
    ExpenseFormComponent,
    HostelFeeComponent,
    PaymentHistoryComponent,
    NavbarComponent
   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
 
    AppRoutingModule,
    RouterModule,
   
    ReactiveFormsModule
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch()),CaptchaService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
