import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {

  userForm: FormGroup;
  isCorporate: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      userType: ['', Validators.required],
      feePaidByCompany: [''],
      joiningDate: ['', Validators.required],
      purpose: ['', Validators.required],
      roomSharing: ['', Validators.required],
      frequency: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      alternateMobilenumber: [''],
      email: ['', [Validators.required, Validators.email]],
      idProof: ['', Validators.required],
      dataConfirmed: [false, Validators.requiredTrue]
    });
  }

  onUserTypeChange(event: any): void {
    this.isCorporate = event.target.value === 'corporate';
    if (this.isCorporate) {
      this.userForm.get('feePaidByCompany')?.setValidators(Validators.required);
    } else {
      this.userForm.get('feePaidByCompany')?.clearValidators();
    }
    this.userForm.get('feePaidByCompany')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.http.post('http://localhost:8081/api/user/save', this.userForm.value)
        .subscribe(response => {
          console.log('Form submitted successfully!', response);
        }, error => {
          console.error('Form submission error:', error);
        });
    } else {
      console.log('Form is invalid!');
    }
  }
}
