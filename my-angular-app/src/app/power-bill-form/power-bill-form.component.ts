import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-power-bill-form',
  templateUrl: './power-bill-form.component.html',
  styleUrls: ['./power-bill-form.component.scss']
})
export class PowerBillFormComponent {
  powerBillForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.powerBillForm = this.fb.group({
      records: this.fb.array([this.createRecord()]),
      totalAmountSpent: [{ value: 0, disabled: true }],
      receiptAttached: ['', Validators.required]
    });

    this.records.valueChanges.subscribe(() => {
      this.updateTotalAmountSpent();
    });
  }

  get records() {
    return this.powerBillForm.get('records') as FormArray;
  }

  createRecord(): FormGroup {
    return this.fb.group({
      hostelName: ['', Validators.required],
      paidDate: ['', Validators.required],
      paidAmount: [0, [Validators.required, Validators.min(0)]],
      receiptAttached: ['']
    });
  }

  addRecord() {
    this.records.push(this.createRecord());
  }

  deleteRecord(index: number) {
    this.records.removeAt(index);
    this.updateTotalAmountSpent();
  }

  updateTotalAmountSpent() {
    const totalAmountSpent = this.records.controls.reduce((total, record) => {
      const paidAmount = record.get('paidAmount')?.value || 0;
      return total + paidAmount;
    }, 0);
    this.powerBillForm.get('totalAmountSpent')?.setValue(totalAmountSpent);
  }
}
