import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-monthly-rent-form',
  templateUrl: './monthly-rent-form.component.html',
  styleUrls: ['./monthly-rent-form.component.scss']
})
export class MonthlyRentFormComponent {
  rentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rentForm = this.fb.group({
      records: this.fb.array([this.createRecord()]),
      totalAmount: [{ value: 0, disabled: true }]
    });

    this.records.valueChanges.subscribe(() => {
      this.updateTotalAmount();
    });
  }

  get records() {
    return this.rentForm.get('records') as FormArray;
  }

  createRecord(): FormGroup {
    return this.fb.group({
      hostelName: ['', Validators.required],
      ownerName: ['', Validators.required],
      paidDate: ['', Validators.required],
      paidAmount: [0, [Validators.required, Validators.min(0)]],
      receipt: ['']
    });
  }

  addRecord() {
    this.records.push(this.createRecord());
  }

  deleteRecord(index: number) {
    this.records.removeAt(index);
    this.updateTotalAmount();
  }

  updateTotalAmount() {
    const totalAmount = this.records.controls.reduce((total, record) => {
      const paidAmount = record.get('paidAmount')?.value || 0;
      return total + paidAmount;
    }, 0);
    this.rentForm.get('totalAmount')?.setValue(totalAmount);
  }
}
