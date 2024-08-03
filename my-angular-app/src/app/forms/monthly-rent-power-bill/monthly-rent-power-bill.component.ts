import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-monthly-rent-power-bill',
  templateUrl: './monthly-rent-power-bill.component.html',
  styleUrls: ['./monthly-rent-power-bill.component.scss']
})
export class MonthlyRentPowerBillComponent implements OnInit {
  
  monthlyRentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.monthlyRentForm = this.fb.group({
      hostelName: [''],
      ownerName: [''],
      paidDate: [''],
      paidAmount: [''],
      totalAmount: ['']
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('hostelName', this.monthlyRentForm.get('hostelName')?.value);
    formData.append('ownerName', this.monthlyRentForm.get('ownerName')?.value);
    formData.append('paidDate', this.monthlyRentForm.get('paidDate')?.value);
    formData.append('paidAmount', this.monthlyRentForm.get('paidAmount')?.value);
    
    // Change 'receiptAttached' to match the controller's expected parameter name
    if (this.selectedFile) {
      formData.append('receiptFile', this.selectedFile, this.selectedFile.name);
    }
    
    formData.append('totalAmount', this.monthlyRentForm.get('totalAmount')?.value);
  
    this.dataService.submitMonthlyRent(formData).subscribe(response => {
      console.log('Monthly Rent form submitted successfully', response);
    }, error => {
      console.error('Error submitting Monthly Rent form', error);
    });
  }
}
