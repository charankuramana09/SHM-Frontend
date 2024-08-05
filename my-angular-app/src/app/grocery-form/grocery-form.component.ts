import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent {
  @Input() selectedCategory: string;
  groceryForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,) {
    this.groceryForm = this.fb.group({
      purchaseDate: ['', Validators.required],
      storeName: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
      receiptAttached: ['', Validators.required],
      totalAmount: [{ value: 0, disabled: true }]
    });

    this.items.valueChanges.subscribe(() => {
      this.updateTotalAmount();
    });
  }

  get items() {
    return this.groceryForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      receipt: ['']
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
    this.updateTotalAmount();
  }

  updateTotalAmount() {
    const totalAmount = this.items.controls.reduce((total, item) => {
      const quantity = item.get('quantity')?.value || 0;
      const unitPrice = item.get('unitPrice')?.value || 0;
      return total + (quantity * unitPrice);
    }, 0);
    this.groceryForm.get('totalAmount')?.setValue(totalAmount);
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
    if (this.groceryForm.invalid) {
      this.groceryForm.markAllAsTouched();
      return;
    }

    console.log(this.groceryForm.value);
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
}
