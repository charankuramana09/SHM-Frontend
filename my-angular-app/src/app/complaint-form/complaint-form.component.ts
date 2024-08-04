import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';

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
    private complaintService: ComplaintService
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
      formData.append('complaintForm', JSON.stringify(this.complaintForm.value));
      console.log('Form data appended:', this.complaintForm.value);

      if (this.selectedFile) {
        formData.append('supportingDocument', this.selectedFile, this.selectedFile.name);
        console.log('Supporting document appended:', this.selectedFile.name);
      }

      this.complaintService.submitComplaint(formData).subscribe(
        response => {
          console.log('Complaint submitted successfully!', response);
        },
        error => {
          console.error('Error submitting complaint', error);
        }
      );
    } else {
      console.log('Complaint form is invalid');
    }
  }
}
