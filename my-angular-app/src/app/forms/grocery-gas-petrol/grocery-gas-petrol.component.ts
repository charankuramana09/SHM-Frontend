import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  items = [{}]; 
  constructor(private fb: FormBuilder, private dataService: DataService,private router: Router,
    public dialog: MatDialog) {
    this.groceryForm = this.fb.group({
      purchaseDate: [''],
      storeName: [''],
      category: [''],
      itemDescription: [''],
      quantity: [''],
      unitPrice: [''],
      totalAmount: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.groceryForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
    this.groceryForm.get('unitPrice')?.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal() {
    const quantity = this.groceryForm.get('quantity')?.value;
    const unitPrice = this.groceryForm.get('unitPrice')?.value;
    const total = quantity * unitPrice;
    this.groceryForm.get('totalAmount')?.setValue(total);
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('purchaseDate', this.groceryForm.get('purchaseDate')?.value);
    formData.append('storeName', this.groceryForm.get('storeName')?.value);
    formData.append('category', this.groceryForm.get('category')?.value);
    formData.append('itemDescription', this.groceryForm.get('itemDescription')?.value);
    formData.append('quantity', this.groceryForm.get('quantity')?.value);
    formData.append('unitPrice', this.groceryForm.get('unitPrice')?.value);
    formData.append('totalAmount', this.groceryForm.get('totalAmount')?.value);
    
    if (this.selectedFile) {
      formData.append('receiptAttached', this.selectedFile, this.selectedFile.name);
    }

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
      data: { data: 'updated',message: 'expences data ' } // Pass the data object with authorityName
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/expences']); // Navigate after dialog is closed
    });
  }
  addRow() {
    this.items.push({});
  }
  
  deleteRow(index: number) {
    this.items.splice(index, 1);
  }
}
