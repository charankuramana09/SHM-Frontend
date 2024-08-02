import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent {
  expenseForm: FormGroup;
  categories = [
    { value: 'monthly-rent', label: 'Monthly Rent Payment' },
    { value: 'employee-salaries', label: 'Employee Salaries' },
    { value: 'power-bill', label: 'Power Bill' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'gas', label: 'Gas' }
  ];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required]
    });
  }

  get selectedCategory() {
    return this.expenseForm.get('category')?.value;
  }

  get storeNameLabel() {
    switch (this.selectedCategory) {
      case 'petrol':
        return 'Bunk Name';
      case 'gas':
        return 'Gas Agency Name';
      default:
        return 'Store Name';
    }
  }

  onSubmit() {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const form = this.getFormComponent(this.selectedCategory);
    if (form && form.invalid) {
      form.markAllAsTouched();
      return;
    }

    console.log(this.expenseForm.value);
  }

  onCancel() {
    this.expenseForm.reset();
  }

  getFormComponent(category: string): FormGroup | null {
    switch (category) {
      case 'grocery':
      case 'petrol':
      case 'gas':
        return (document.querySelector('app-grocery-form') as any)?.groceryForm;
      case 'monthly-rent':
        return (document.querySelector('app-monthly-rent-form') as any)?.rentForm;
      case 'power-bill':
        return (document.querySelector('app-power-bill-form') as any)?.powerBillForm;
      case 'employee-salaries':
        return (document.querySelector('app-employee-salaries') as any)?.salariesForm;
      default:
        return null;
    }
  }
}
