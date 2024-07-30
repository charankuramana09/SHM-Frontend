import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
=======
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> rohith

import { AppComponent } from './app.component';
import { CompanyInvoiceGenerationComponent } from './company-invoice-generation/company-invoice-generation.component';
import { HttpClientModule } from '@angular/common/http';
import { HostelMembersDashboardComponent } from './hostel-members-dashboard/hostel-members-dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { CaptchaService } from './services/captcha.service';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
=======
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
>>>>>>> rohith

@NgModule({
  declarations: [
    AppComponent,
    CompanyInvoiceGenerationComponent,
    HostelMembersDashboardComponent,
    PaymentHistoryComponent,
<<<<<<< HEAD
    SignupScreenComponent,
    SignupFormComponent,
    LoginPageComponent,
    PaymentFormComponent,
    UserRegistrationComponent,
    CaptchaComponent,
    MathCaptchaComponent,
=======
    ComplaintFormComponent
>>>>>>> rohith
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
<<<<<<< HEAD
=======
    ReactiveFormsModule
>>>>>>> rohith
  ],
  providers: [provideClientHydration(), CaptchaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
