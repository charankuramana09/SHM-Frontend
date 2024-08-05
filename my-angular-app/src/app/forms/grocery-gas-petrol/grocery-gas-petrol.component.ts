// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { DataService } from '../../services/data.service';
// import { MatDialog } from '@angular/material/dialog';
// import { RegistrationSuccessDialogComponent } from '../../registration-success-dialog/registration-success-dialog.component';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-grocery-gas-petrol',
//   templateUrl: './grocery-gas-petrol.component.html',
//   styleUrls: ['./grocery-gas-petrol.component.scss']
// })
// export class GroceryGasPetrolComponent implements OnInit {
//   groceryForm: FormGroup;
//   selectedFile: File | null = null;
//   items = [{}]; 
//   constructor(private fb: FormBuilder, private dataService: DataService,private router: Router,
//     public dialog: MatDialog) {
//     this.groceryForm = this.fb.group({
//       purchaseDate: [''],
//       storeName: [''],
//       category: [''],
//       itemDescription: [''],
//       quantity: [''],
//       unitPrice: [''],
//       totalAmount: [{ value: '', disabled: true }]
//     });
//   }

//   ngOnInit(): void {
//     this.groceryForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
//     this.groceryForm.get('unitPrice')?.valueChanges.subscribe(() => this.calculateTotal());
//   }

//   calculateTotal() {
//     const quantity = this.groceryForm.get('quantity')?.value;
//     const unitPrice = this.groceryForm.get('unitPrice')?.value;
//     const total = quantity * unitPrice;
//     this.groceryForm.get('totalAmount')?.setValue(total);
//   }

//   onFileChange(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   onSubmit() {
//     const formData = new FormData();
//     formData.append('purchaseDate', this.groceryForm.get('purchaseDate')?.value);
//     formData.append('storeName', this.groceryForm.get('storeName')?.value);
//     formData.append('category', this.groceryForm.get('category')?.value);
//     formData.append('itemDescription', this.groceryForm.get('itemDescription')?.value);
//     formData.append('quantity', this.groceryForm.get('quantity')?.value);
//     formData.append('unitPrice', this.groceryForm.get('unitPrice')?.value);
//     formData.append('totalAmount', this.groceryForm.get('totalAmount')?.value);
    
//     if (this.selectedFile) {
//       formData.append('receiptAttached', this.selectedFile, this.selectedFile.name);
//     }

//     this.dataService.submitExpense(formData).subscribe(
//       response => {
//         this.openDialog();
//         console.log('Expense form submitted successfully', response);
//       },
//       error => {
//         console.error('Error submitting expense form', error);
//       }
//     );
//   }
//   openDialog(): void {
//     const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
//       width: '40%',
//       data: { data: 'updated',message: 'expences data ' } // Pass the data object with authorityName
//     });
//     dialogRef.afterClosed().subscribe(() => {
//       this.router.navigate(['/expences']); // Navigate after dialog is closed
//     });
//   }
//   addRow() {
//     this.items.push({});
//   }
  
//   deleteRow(index: number) {
//     this.items.splice(index, 1);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../../registration-success-dialog/registration-success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery-gas-petrol',
  templateUrl: './grocery-gas-petrol.component.html',
  styleUrls: ['./grocery-gas-petrol.component.scss']
})
export class GroceryGasPetrolComponent implements OnInit {
  groceryForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.groceryForm = this.fb.group({
      purchaseDate: ['', Validators.required],
      storeName: ['', Validators.required],
      items: this.fb.array([this.createItem()], Validators.required),
      receiptAttached: [null]
    });
  }

  ngOnInit(): void {}

  createItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      itemDescription: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      totalAmount: [{ value: 0, disabled: true }]
    });
  }

  get items(): FormArray {
    return this.groceryForm.get('items') as FormArray;
  }

  addRow(): void {
    this.items.push(this.createItem());
  }

  deleteRow(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.updateTotalAmounts();
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  calculateTotal(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const unitPrice = item.get('unitPrice')?.value || 0;
    const total = quantity * unitPrice;
    item.get('totalAmount')?.setValue(total);
    this.updateTotalAmounts();
  }

  updateTotalAmounts(): void {
    // Calculate total amount for all rows if needed
    // Example: Could be used to show total of all rows
  }

  onSubmit(): void {
    if (this.groceryForm.invalid) {
      this.groceryForm.markAllAsTouched(); // Show validation errors
      return;
    }

    const formData = new FormData();
    formData.append('purchaseDate', this.groceryForm.get('purchaseDate')?.value);
    formData.append('storeName', this.groceryForm.get('storeName')?.value);

    this.items.controls.forEach((item, index) => {
      formData.append(`category_${index}`, item.get('category')?.value);
      formData.append(`itemDescription_${index}`, item.get('itemDescription')?.value);
      formData.append(`quantity_${index}`, item.get('quantity')?.value);
      formData.append(`unitPrice_${index}`, item.get('unitPrice')?.value);
      formData.append(`totalAmount_${index}`, item.get('totalAmount')?.value);

      const file = this.selectedFile;
      if (file) {
        formData.append('receiptAttached', file, file.name);
      }
    });

    this.dataService.submitExpense(formData).subscribe(
      response => {
        this.openDialog();
        console.log('Expense form submitted successfully', response);
      },
      error => {
        console.error('Error submitting expense form', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { data: 'updated', message: 'Expenses data' } // Pass the data object with authorityName
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/expenses']); // Navigate after dialog is closed
    });
  }
}

