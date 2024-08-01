import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrls: ['./employee-salaries.component.scss']
})
export class EmployeeSalariesComponent {
  salariesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.salariesForm = this.fb.group({
      salaries: this.fb.array([this.createSalary()]),
      totalSalary: [{ value: 0, disabled: true }]
    });

    this.salaries.valueChanges.subscribe(() => {
      this.updateTotalSalary();
    });
  }

  get salaries() {
    return this.salariesForm.get('salaries') as FormArray;
  }

  createSalary(): FormGroup {
    return this.fb.group({
      employeeName: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      paymentDate: ['', Validators.required],
      receipt: ['']
    });
  }

  addSalary() {
    this.salaries.push(this.createSalary());
  }

  deleteSalary(index: number) {
    this.salaries.removeAt(index);
    this.updateTotalSalary();
  }

  updateTotalSalary() {
    const totalSalary = this.salaries.controls.reduce((total, salary) => {
      const salaryAmount = salary.get('salary')?.value || 0;
      return total + salaryAmount;
    }, 0);
    this.salariesForm.get('totalSalary')?.setValue(totalSalary);
  }
}
