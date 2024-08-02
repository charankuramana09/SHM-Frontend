import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';

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

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required]
      // Add other common fields here if needed
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

    const selectedCategory = this.selectedCategory;
    const form = this.getFormComponent(selectedCategory);

    if (form && form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const payload = { ...this.expenseForm.value, ...form?.value };

    switch (selectedCategory) {
      case 'employee-salaries':
        const receiptFile = form?.get('receiptAttached')?.value;
        this.expenseService.createEmployeeSalaries(payload, receiptFile).subscribe(response => {
          console.log('Employee Salaries saved', response);
        });
        break;
      case 'monthly-rent':
      case 'power-bill':
        const file = form?.get('receiptAttached')?.value;
        payload.paidDate = new Date(payload.paidDate); // Ensure date is correctly converted
        this.expenseService.createHostelPayment(payload, file).subscribe(response => {
          console.log('Monthly Rent or Power Bill saved', response);
        });
        break;
      default:
        this.expenseService.createExpense(payload).subscribe(response => {
          console.log('Expense saved', response);
        });
    }
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
        return (document.querySelector('app-employee-salaries-form') as any)?.salariesForm;
      case 'petrol':
        return (document.querySelector('app-petrol-form') as any)?.petrolForm;
      case 'gas':
        return (document.querySelector('app-gas-form') as any)?.gasForm;
      default:
        return null;
    }
  }
}