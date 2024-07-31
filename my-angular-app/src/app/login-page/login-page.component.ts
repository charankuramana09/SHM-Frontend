import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  emailError: string | null = null;
  passwordError: string | null = null;
  captchaError: string | null = null;
  mathCaptchaError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      captcha: ['', Validators.required],  // Bind captcha value
      mathCaptcha: ['', Validators.required] // Bind math captcha value
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.captchaError || this.mathCaptchaError) {
      this.loginForm.markAllAsTouched();  // Trigger validation messages
      return;
    }

    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        if (error.error.message === 'Email does not exist') {
          this.emailError = 'Email does not exist';
          this.loginForm.get('email')?.setValue('');
        } else if (error.error.message === 'Invalid password') {
          this.passwordError = 'Invalid password';
          this.loginForm.get('password')?.setValue('');
        }
        console.error('Login failed', error);
      }
    });
  }

  onCaptchaValidation(isValid: boolean, captchaType: string): void {
    if (!isValid) {
      if (captchaType === 'captcha') {
        this.captchaError = 'Invalid captcha.';
      } else if (captchaType === 'math captcha') {
        this.mathCaptchaError = 'Invalid math captcha.';
      }
    } else {
      if (captchaType === 'captcha') {
        this.captchaError = null;
      } else if (captchaType === 'math captcha') {
        this.mathCaptchaError = null;
      }
    }
  }
}
