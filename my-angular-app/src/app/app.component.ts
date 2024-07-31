import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fixed typo in styleUrls
})
export class AppComponent {
  categories = ['Monthly Rent Expenses', 'Grocery', 'Gas', 'Power Bill', 'Petrol Charges', 'Employee Salaries'];
  selectedCategory = '';
  items = [{ description: '', quantity: 1, unitPrice: 0 }];
  salaries = [{ empId: '', empName: '', salary: 0, date: '' }];
  receiptAttached = '';
  totalAmount = 0; // Add totalAmount to your component

  constructor(private http: HttpClient) {} // Inject HttpClient

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
    const file = (event.target as HTMLInputElement).files[0];
    console.log('File selected:', file);
  }

  calculateTotalAmount() {
    // Calculate total amount based on items and salaries
    this.totalAmount = this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) + 
                       this.salaries.reduce((sum, salary) => sum + salary.salary, 0);
  }

  onSubmit(form: any) {
    if (form.valid) {
      const expenseData = {
        purchaseDate: form.value.purchaseDate,
        storeName: form.value.storeName,
        category: this.selectedCategory,
        itemDescription: this.items.map(item => item.description).join(', '), // Join item descriptions
        quantity: this.items.reduce((sum, item) => sum + item.quantity, 0), // Total quantity
        unitPrice: this.items.reduce((sum, item) => sum + item.unitPrice, 0), // Total unit price (if needed)
        empId: this.salaries.length > 0 ? this.salaries[0].empId : '',
        empName: this.salaries.length > 0 ? this.salaries[0].empName : '',
        salary: this.salaries.length > 0 ? this.salaries[0].salary : 0,
        salaryDate: this.salaries.length > 0 ? this.salaries[0].date : '',
        totalAmount: this.totalAmount,
        receiptAttached: this.receiptAttached,
        receiptFilePath: this.receiptAttached === 'yes' ? '/path/to/receipt.jpg' : '',
        receiptReason: this.receiptAttached === 'no' ? form.value.receiptReason : ''
      };

      // Send the expense data to the backend
      this.http.post('http://localhost:8080/api/expenses', expenseData)
        .subscribe(response => {
          console.log('Expense submitted successfully:', response);
        }, error => {
          console.error('Error submitting expense:', error);
        });
    }
  }
}
