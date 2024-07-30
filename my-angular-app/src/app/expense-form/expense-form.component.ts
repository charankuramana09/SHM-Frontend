import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent {
  categories = ['Monthly Rent Expenses', 'Grocery', 'Gas', 'Power Bill', 'Petrol Charges', 'Employee Salaries'];
  selectedCategory = '';
  changingCategory = false; // New state to control the category change overlay
  items = [{ description: '', quantity: 1, unitPrice: 0 }];
  salaries = [{ empId: '', empName: '', salary: 0, date: '' }];
  receiptAttached = '';

  onCategoryChange() {
    console.log('Selected Category:', this.selectedCategory);
    
    if (this.selectedCategory === 'Employee Salaries') {
      this.items = [];
      if (this.salaries.length === 0) {
        this.salaries.push({ empId: '', empName: '', salary: 0, date: '' });
      }
    } else {
      this.salaries = [];
      if (this.items.length === 0) {
        this.items.push({ description: '', quantity: 1, unitPrice: 0 });
      }
    }
  }

  addItem() {
    this.items.push({ description: '', quantity: 1, unitPrice: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addSalary() {
    this.salaries.push({ empId: '', empName: '', salary: 0, date: '' });
  }

  removeSalary(index: number) {
    this.salaries.splice(index, 1);
  }

  onReceiptChange(value: string) {
    this.receiptAttached = value;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      // Handle file upload
    }
  }

  initiateCategoryChange() {
    this.changingCategory = true;
  }

  confirmCategoryChange() {
    this.changingCategory = false;
    this.onCategoryChange();
  }

  onSubmit(form: any) {
    console.log('Form Submitted:', form.value);
    // Handle form submission
  }
}
