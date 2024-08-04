import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-employee-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrl: './employee-salaries.component.scss'
})
export class EmployeeSalariesComponent implements OnInit{
  employeeSalariesForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.employeeSalariesForm = this.fb.group({
      empName: [''],
      designation: [''],
      salary: [''],
      paymentDate: [''],
      receiptAttached: ['']
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('employee', new Blob([JSON.stringify(this.employeeSalariesForm.value)], { type: 'application/json' }));
    if (this.selectedFile) {
        formData.append('receiptAttached', this.selectedFile, this.selectedFile.name);
    }
    this.dataService.submitEmployeeSalaries(formData).subscribe(response => {
        console.log('Employee Salaries form submitted successfully', response);
    }, error => {
        console.error('Error submitting form', error);
    });
}
}
