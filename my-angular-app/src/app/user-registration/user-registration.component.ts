import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {

  userDetails: FormGroup;
  isCorporate: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userDetails = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      userType: ['', Validators.required],
      // feePaidByCompany: [''],
      joiningDate: ['', Validators.required],
      purpose: ['', Validators.required],
      roomSharing: ['', Validators.required],
      frequency: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      alternateMobileNumber: ['', Validators.pattern(/^\d+$/)],
      email: ['', [Validators.required, Validators.email]],
      // idProofType: ['', Validators.required],
      idProof: [null, Validators.required]
      // dataConfirmed: [false, Validators.requiredTrue]
    });
  }

  onUserTypeChange(event: any): void {
    this.isCorporate = event.target.value === 'corporate';
    if (this.isCorporate) {
      this.userDetails.get('feePaidByCompany')?.setValidators(Validators.required);
    } else {
      this.userDetails.get('feePaidByCompany')?.clearValidators();
    }
    this.userDetails.get('feePaidByCompany')?.updateValueAndValidity();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userDetails.patchValue({
        idProof: file
      });
    }
  }

  onSubmit(): void {
    if (this.userDetails.valid) {
      const formData = new FormData();
      Object.keys(this.userDetails.value).forEach(key => {
        if (key === 'idProof') {
          formData.append('file', this.userDetails.get(key)?.value);
        } else {
          formData.append(key, this.userDetails.get(key)?.value);
        }
      });

      const userDetailsCopy = { ...this.userDetails.value };
      delete userDetailsCopy.idProof;
      formData.append('userDetails', JSON.stringify(userDetailsCopy));

      this.http.post('http://localhost:8084/user/save', formData)
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
