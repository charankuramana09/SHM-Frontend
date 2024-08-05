import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../services/shared-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {

  userDetails: FormGroup;
  isCorporate: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient,private sharedService:SharedServiceService,private router:Router,public dialog: MatDialog) {
    this.userDetails = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      userType: ['', Validators.required],
      joiningDate: ['', Validators.required],
      purpose: ['', Validators.required],
      roomSharing: ['', Validators.required],
      frequency: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      alternateMobileNumber: ['', Validators.pattern(/^\d+$/)],
      email: ['', [Validators.required, Validators.email]],
      idProof: [null, Validators.required]
    });
    console.log('UserRegistrationComponent initialized.');
  }

  ngOnInit(): void {
    // Retrieve email from local storage and set it to the form
    const email = localStorage.getItem('email');
    if (email) {
      this.userDetails.patchValue({ email });
    }
  }

  onUserTypeChange(event: any): void {
    console.log('User type changed:', event.target.value);
    this.isCorporate = event.target.value === 'corporate';
    if (this.isCorporate) {
      this.userDetails.get('feePaidByCompany')?.setValidators(Validators.required);
      console.log('Corporate user detected. Fee paid by company is now required.');
    } else {
      this.userDetails.get('feePaidByCompany')?.clearValidators();
      console.log('Non-corporate user detected. Fee paid by company is no longer required.');
    }
    this.userDetails.get('feePaidByCompany')?.updateValueAndValidity();
    console.log('Validators updated for feePaidByCompany.');
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      this.userDetails.patchValue({
        idProof: file
      });
      console.log('File patch value updated.');
    }
  }

  onSubmit(): void {
    console.log('Form submit triggered.');
    if (this.userDetails.valid) {
      console.log('Form is valid. Preparing form data for submission.');
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

      console.log('Form data prepared. Submitting to server.');
      this.http.post('http://localhost:8084/user/save', formData)
        .subscribe(response => {
          this.sharedService.setuserRegistrationStatus(true);
          this.openDialog();
          console.log('Form submitted successfully!', response);
        }, error => {
          console.error('Form submission error:', error);
        });
    } else {
      console.log('Form is invalid!');
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: ' Successfull', message: 'Registration is ' } // Pass the data object with authorityName
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/nav-bar']); // Navigate after dialog is closed
    });
  }
}
