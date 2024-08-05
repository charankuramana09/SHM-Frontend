// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { DataService } from '../../services/data.service';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { RegistrationSuccessDialogComponent } from '../../registration-success-dialog/registration-success-dialog.component';
// @Component({
//   selector: 'app-employee-salaries',
//   templateUrl: './employee-salaries.component.html',
//   styleUrl: './employee-salaries.component.scss'
// })
// export class EmployeeSalariesComponent implements OnInit{
//   employeeSalariesForm: FormGroup;
//   selectedFile: File | null = null;
//   items = [{}]; 

//   constructor(private fb: FormBuilder, private dataService: DataService,
//     private router: Router,
//     public dialog: MatDialog) {
//     this.employeeSalariesForm = this.fb.group({
//       empName: [''],
//       designation: [''],
//       salary: [''],
//       paymentDate: [''],
//       receiptAttached: ['']
//     });
//   }

//   ngOnInit(): void {}

//   onFileChange(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   onSubmit() {
//     const formData = new FormData();
//     formData.append('employee', new Blob([JSON.stringify(this.employeeSalariesForm.value)], { type: 'application/json' }));
//     if (this.selectedFile) {
//         formData.append('receiptAttached', this.selectedFile, this.selectedFile.name);
//     }
//     this.dataService.submitEmployeeSalaries(formData).subscribe(response => {
//       this.openDialog();
//         console.log('Employee Salaries form submitted successfully', response);
//     }, error => {
//         console.error('Error submitting form', error);
//     });
// }
// addRow() {
//   this.items.push({});
// }

// deleteRow(index: number) {
//   this.items.splice(index, 1);
// }openDialog(): void {
//   const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
//     width: '40%',
//     data: { data: 'updated',message: 'expences data ' } // Pass the data object with authorityName
//   });
//   dialogRef.afterClosed().subscribe(() => {
//     this.router.navigate(['/expences']); // Navigate after dialog is closed
//   });
// }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../../registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-employee-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrls: ['./employee-salaries.component.scss']
})
export class EmployeeSalariesComponent implements OnInit {
  employeeSalariesForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.employeeSalariesForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }

  ngOnInit(): void {}

  get items(): FormArray {
    return this.employeeSalariesForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      empName: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      paymentDate: ['', Validators.required],
      receiptAttached: ['']
    });
  }

  addRow(): void {
    this.items.push(this.createItem());
  }

  deleteRow(index: number): void {
    this.items.removeAt(index);
  }

  onFileChange(event: any, index: number): void {
    this.selectedFiles[index] = event.target.files[0];
    const control = this.items.at(index).get('receiptAttached');
    if (control) {
      control.setValue(this.selectedFiles[index]);
    }
  }

  onSubmit(): void {
    if (this.employeeSalariesForm.invalid) {
      this.employeeSalariesForm.markAllAsTouched();
      return;
    }
    
    const formData = new FormData();
    this.items.controls.forEach((control, index) => {
      formData.append(`items[${index}][empName]`, control.get('empName')?.value);
      formData.append(`items[${index}][designation]`, control.get('designation')?.value);
      formData.append(`items[${index}][salary]`, control.get('salary')?.value);
      formData.append(`items[${index}][paymentDate]`, control.get('paymentDate')?.value);
      const file = this.selectedFiles[index];
      if (file) {
        formData.append(`items[${index}][receiptFile]`, file, file.name);
      }
    });

    this.dataService.submitEmployeeSalaries(formData).subscribe(response => {
      this.openDialog();
      console.log('Employee Salaries form submitted successfully', response);
    }, error => {
      console.error('Error submitting form', error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: 'updated', message: 'expenses data' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/expenses']);
    });
  }
}

