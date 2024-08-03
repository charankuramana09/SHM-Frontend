// login-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  emailError: string | null = null;
  passwordError: string | null = null;
  captchaError: string | null = null;
  mathCaptchaError: string | null = null;
  captchaValid: boolean = false;
  mathCaptchaValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      captcha: [''], // CAPTCHA field
      mathCaptcha: [''] // Mathematical CAPTCHA field
    });
  }

  ngOnInit(): void {
    this.loginForm.get('captcha')?.valueChanges.subscribe(() => {
      if (this.captchaError && this.captchaValid) {
        this.captchaError = null;
      }
    });

    this.loginForm.get('mathCaptcha')?.valueChanges.subscribe(() => {
      if (this.mathCaptchaError && this.mathCaptchaValid) {
        this.mathCaptchaError = null;
      }
    });
  }

  onSubmit(): void {
    this.emailError = null;
    this.passwordError = null;
    this.captchaError = null;
    this.mathCaptchaError = null;

    if (this.loginForm.invalid || !this.captchaValid || !this.mathCaptchaValid) {
      this.loginForm.markAllAsTouched();

      if (!this.captchaValid) {
        this.captchaError = 'Invalid CAPTCHA.';
      }
      if (!this.mathCaptchaValid) {
        this.mathCaptchaError = 'Invalid mathematical CAPTCHA.';
      }
      if (this.loginForm.get('captcha')?.value === '') {
        this.captchaError = 'CAPTCHA is required.';
      }
      if (this.loginForm.get('mathCaptcha')?.value === '') {
        this.mathCaptchaError = 'Mathematical CAPTCHA is required.';
      }
      return;
    }

    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        const isSuperAdmin = response.authorities.includes('ROLE_SUPERADMIN');
        this.sharedService.setSuperAdminStatus(isSuperAdmin);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        if (error.status === 404) {
          this.emailError = 'Email does not exist';
          this.loginForm.get('email')?.setValue('');
        } else if (error.status === 401) {
          this.passwordError = 'Invalid password';
          this.loginForm.get('password')?.setValue('');
        }
        console.error('Login failed', error);
      }
    });
  }

  onCaptchaValidityChange(isValid: boolean): void {
    this.captchaValid = isValid;
    if (isValid && this.captchaError) {
      this.captchaError = null;
    }
  }

  onMathCaptchaValidityChange(isValid: boolean): void {
    this.mathCaptchaValid = isValid;
    if (isValid && this.mathCaptchaError) {
      this.mathCaptchaError = null;
    }
  }
}
