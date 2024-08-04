import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-monthly-rent-power-bill',
  templateUrl: './monthly-rent-power-bill.component.html',
  styleUrls: ['./monthly-rent-power-bill.component.scss']
})
export class MonthlyRentPowerBillComponent implements OnInit {
  monthlyRentForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.monthlyRentForm = this.fb.group({
      rentDetails: this.fb.array([this.createRentDetail()]),
      totalAmount: ['']
    });
  }

  ngOnInit(): void {}

  createRentDetail(): FormGroup {
    return this.fb.group({
      hostelName: [''],
      ownerName: [''],
      paidDate: [''],
      paidAmount: [''],
    });
  }

  get rentDetails(): FormArray {
    return this.monthlyRentForm.get('rentDetails') as FormArray;
  }

  addRow(): void {
    this.rentDetails.push(this.createRentDetail());
  }

  removeRow(index: number): void {
    this.rentDetails.removeAt(index);
  }

  onFileChange(event: any, index: number): void {
    this.selectedFiles[index] = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    this.rentDetails.controls.forEach((control, index) => {
      formData.append(`rentDetails[${index}].hostelName`, control.get('hostelName')?.value);
      formData.append(`rentDetails[${index}].ownerName`, control.get('ownerName')?.value);
      formData.append(`rentDetails[${index}].paidDate`, control.get('paidDate')?.value);
      formData.append(`rentDetails[${index}].paidAmount`, control.get('paidAmount')?.value);
      if (this.selectedFiles[index]) {
        formData.append(`rentDetails[${index}].receiptFile`, this.selectedFiles[index], this.selectedFiles[index].name);
      }
    });
    formData.append('totalAmount', this.monthlyRentForm.get('totalAmount')?.value);

    this.dataService.submitMonthlyRent(formData).subscribe(response => {
      console.log('Monthly Rent form submitted successfully', response);
    }, error => {
      console.error('Error submitting Monthly Rent form', error);
    });
  }
}
