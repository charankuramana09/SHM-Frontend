import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  usersArray: any[] = [];
  categories = ['Monthly Rent Expenses', 'Grocery', 'Gas', 'Power Bill', 'Petrol Charges', 'Employee Salaries'];
  selectedCategory = '';
  changingCategory = false;
  changingCategory = false;
  items = [{ itemDescription: '', quantity: 1, unitPrice: 0 }];
  salaries = [{ empId: '', empName: '', salary: 0, salaryDate: '' }];
  rents = [{ hostelName: '', ownerName: '', rentDate: '', amount: 0 }];
  receiptAttached = '';

  constructor(private expenseService: ExpenseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.user) {
        try {
          this.salaries = JSON.parse(params.user);
          console.log(this.salaries);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    });
  }

  onCategoryChange() {
    console.log('Selected Category:', this.selectedCategory);

    if (this.selectedCategory === 'Employee Salaries') {
      this.items = [];
      this.rents = [];
      if (this.salaries.length === 0) {
        this.salaries.push({ empId: '', empName: '', salary: 0, salaryDate: '' });
      }
    } else if (this.selectedCategory === 'Monthly Rent Expenses') {
      this.items = [];
      this.salaries = [];
      if (this.rents.length === 0) {
        this.rents.push({ hostelName: '', ownerName: '', rentDate: '', amount: 0 });
      }
    } else {
      this.salaries = [];
      this.rents = [];
      if (this.items.length === 0) {
        this.items.push({ itemDescription: '', quantity: 1, unitPrice: 0 });
      }
    }
  }

  addItem() {
    this.items.push({ itemDescription: '', quantity: 1, unitPrice: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addSalary() {
    this.salaries.push({ empId: '', empName: '', salary: 0, salaryDate: '' });
  }

  removeSalary(index: number) {
    this.salaries.splice(index, 1);
  }

  addRent() {
    this.rents.push({ hostelName: '', ownerName: '', rentDate: '', amount: 0 });
  }

  removeRent(index: number) {
    this.rents.splice(index, 1);
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

    if (this.selectedCategory === 'Employee Salaries') {
      const employeeSalaries = this.salaries.map(salary => ({
        empId: salary.empId,
        empName: salary.empName,
        salary: salary.salary,
        salaryDate: salary.salaryDate
      }));

      console.log('Employee Salaries Data:', employeeSalaries);
      console.log('Request Payload:', JSON.stringify(employeeSalaries));

      this.expenseService.createEmployeeSalaries(employeeSalaries).subscribe(
        response => {
          console.log('Employee Salaries Saved:', response);
        },
        error => {
          console.error('Error saving employee salaries:', error);
        }
      );
      this.expenseService.createEmployeeSalaries(employeeSalaries).subscribe(response => {
        console.log('Employee Salaries Saved:', response);
      }, error => {
        console.error('Error saving employee salaries:', error);
      });
    } else if (this.selectedCategory === 'Monthly Rent Expenses') {
      const rentExpenses = this.rents.map(rent => ({
        hostelName: rent.hostelName,
        ownerName: rent.ownerName,
        rentDate: rent.rentDate,
        amount: rent.amount
      }));

      this.expenseService.createRentExpenses(rentExpenses).subscribe(response => {
        console.log('Rent Expenses Saved:', response);
      }, error => {
        console.error('Error saving rent expenses:', error);
      });
    } else {
      const expense = {
        ...form.value,
        items: this.items,
        category: this.selectedCategory,
        receiptAttached: this.receiptAttached === 'yes',
        receiptFilePath: this.receiptAttached === 'yes' ? 'path/to/receipt' : '',
        receiptReason: this.receiptAttached === 'no' ? form.value.receiptReason : ''
      };

      this.expenseService.createExpense(expense).subscribe(
        response => {
          console.log('Expense Saved:', response);
        },
        error => {
          console.error('Error saving expense:', error);
        }
      );
    }
  }
}
