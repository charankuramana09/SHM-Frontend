import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss'
})
export class ComplaintFormComponent {
  complaintForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService
  ) { }

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', ],
      location: ['', Validators.required],
      description: ['', Validators.required],
      action: ['', Validators.required],
      typeComplaint: ['', Validators.required],
      othersInvolved: ['',],
      supportingDocument:[null]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      const formData = new FormData();
      formData.append('complaintForm', JSON.stringify(this.complaintForm.value));

      if (this.selectedFile) {
        formData.append('supportingDocument', this.selectedFile, this.selectedFile.name);
      }

      this.complaintService.submitComplaint(formData).subscribe(
        response => {
          console.log('Complaint submitted successfully!', response);
        },
        error => {
          console.error('Error submitting complaint', error);
        }
      );
    }
  }
}















// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ComplaintService } from '../services/complaint.service';

// @Component({
//   selector: 'app-complaint-form',
//   templateUrl: './complaint-form.component.html',
//   styleUrl: './complaint-form.component.scss'
// })
// export class ComplaintFormComponent {
//   complaintForm: FormGroup;

//   constructor(private fb: FormBuilder, private complaintService: ComplaintService) {
//     this.complaintForm = this.fb.group({
//       name: ['', Validators.required],
//       contactNumber: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       date: ['', Validators.required],
//       time: ['', Validators.required],
//       location: ['', Validators.required],
//       description: ['', Validators.required],
//       actionRequested: ['', Validators.required],
//       supportingDocuments: [null],
//       othersInvolved: ['']
//     });
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     this.complaintForm.patchValue({ supportingDocuments: file });
//   }

//   onSubmit() {
//     if (this.complaintForm.valid) {
//       const formData = new FormData();
//       Object.keys(this.complaintForm.value).forEach(key => {
//         formData.append(key, this.complaintForm.value[key]);
//       });

//       this.complaintService.submitComplaint(formData).subscribe(response => {
//         console.log('Complaint submitted successfully', response);
//       });
//     }
//   }

// }
