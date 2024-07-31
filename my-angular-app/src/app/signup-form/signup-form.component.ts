import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      authorities: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mustMatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });

      // Clear specific fields if needed
      if (this.signupForm.get('firstName')?.invalid) {
        this.signupForm.get('firstName')?.setValue('');
      }
      if (this.signupForm.get('lastName')?.invalid) {
        this.signupForm.get('lastName')?.setValue('');
      }
      if (this.signupForm.get('email')?.invalid) {
        this.signupForm.get('email')?.setValue('');
      }
      if (this.signupForm.get('password')?.invalid) {
        this.signupForm.get('password')?.setValue('');
      }
      if (this.signupForm.get('confirmPassword')?.invalid) {
        this.signupForm.get('confirmPassword')?.setValue('');
      }
      if (this.signupForm.get('authorities')?.invalid) {
        this.signupForm.get('authorities')?.setValue('');
      }

      return;
    }

    const formValues = this.signupForm.value;
    const user: User = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      authorities: [formValues.authorities]
    };

    this.authService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login-page']);
      },
      error: (error) => {
        console.error('Error registering user', error);
      }
    });
  }
}
