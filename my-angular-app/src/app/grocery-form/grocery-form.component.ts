import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent {
  groceryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.groceryForm = this.fb.group({
      purchaseDate: ['', Validators.required],
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
      unitPrice: [0, [Validators.required, Validators.min(0)]],
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
}
