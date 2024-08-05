import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss']
})
export class ComplaintFormComponent implements OnInit {
  complaintForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    public dialog: MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log('Initializing complaint form');
    this.complaintForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      action: ['', Validators.required],
      typeComplaint: ['', Validators.required],
      othersInvolved: [''],
      supportingDocument: [null]
    });
    console.log('Complaint form initialized:', this.complaintForm);
  }

  onFileChange(event: Event): void {
    console.log('File change detected');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  onSubmit(): void {
    console.log('Form submission initiated');
    if (this.complaintForm.valid) {
      console.log('Complaint form is valid');
      const formData = new FormData();
  
      // Exclude supportingDocument from the JSON string
      const formValue = { ...this.complaintForm.value };
      delete formValue.supportingDocument;
      formData.append('complaintForm', JSON.stringify(formValue));
      console.log('Form data appended:', formValue);
  
      if (this.selectedFile) {
        formData.append('supportingDocument', this.selectedFile, this.selectedFile.name);
        console.log('Supporting document appended:', this.selectedFile.name);
      }
  
      this.complaintService.submitComplaint(formData).subscribe(
        response => {
          console.log('Complaint submitted successfully!', response);
          this.openDialog();
        },
        error => {
          console.error('Error submitting complaint', error);
        }
      );
    } else {
      console.log('Complaint form is invalid');
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: 'received',message: 'complaint has been ' } // Pass the data object with authorityName
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/user-profile']); // Navigate after dialog is closed
    });
  }
}
