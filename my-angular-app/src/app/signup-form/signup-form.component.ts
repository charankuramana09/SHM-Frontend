import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, User } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

// Custom validator for password strength
function passwordStrengthValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  console.log('Password Strength Validator:', value);

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  if (value && !hasSpecialChar) {
    console.log('Password does not contain special character.');
    return { specialChar: true };
  }
  return null;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  isSuperAdmin: boolean = false;
  isUser: boolean = true;
  successMessage: string = 'Sign up now to become a member.';
  signUpButtonMessage = "SIGNUP";
  authorityName: string = "";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private sharedService: SharedServiceService
  ) {
    console.log('SignupFormComponent constructor');

    this.signupForm = this.fb.group({
      authorities: [{ value: '', disabled: true }], // Default disabled
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

  }

  ngOnInit(): void {

    this.sharedService.superAdminStatus$.subscribe(status => {
      if (status) {
        this.isUser = false;
        this.isSuperAdmin = status;
        this.successMessage = 'Create a Profile'
        this.signUpButtonMessage = 'Create Profile'
      }
      // Update form controls based on superAdmin status
      const authoritiesControl = this.signupForm.get('authorities');
      if (this.isSuperAdmin) {
        authoritiesControl?.setValidators(Validators.required);
        authoritiesControl?.enable();
      } else {
        authoritiesControl?.clearValidators();
        authoritiesControl?.disable();
      }
      authoritiesControl?.updateValueAndValidity();
    });
    this.signupForm.get('authorities')?.valueChanges.subscribe(value => {
      this.authorityName = value;
    });
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

      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });

      return; // Exit early if form is invalid
    }

    const formValues = this.signupForm.value;

    // Create User object
    const user: User = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      authorities: this.isSuperAdmin ? [formValues.authorities] : null
    };


    this.authService.registerUser(user).subscribe({
      next: (response) => {
        if (this.isSuperAdmin) {
          this.openDialog();
        } else {
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        if (error.status === 208) {
          this.errorMessage = "Email already exists";
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: this.authorityName, message: 'Profile creation is successful for' } // Pass the data object with authorityName
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin-dashboard']); // Navigate after dialog is closed
    });
  }
  setSuperAdminStatus(status: boolean): void {
    this.isSuperAdmin = status;
  }
}
