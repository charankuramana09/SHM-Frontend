import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-success-dialog',
  templateUrl: './registration-success-dialog.component.html',
  styleUrls: ['./registration-success-dialog.component.scss']
})
export class RegistrationSuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { authorityName: string }, // Specify the type of data
    private dialogRef: MatDialogRef<RegistrationSuccessDialogComponent> // Inject MatDialogRef
  ) { }

  onClose(): void {
    this.dialogRef.close(); 
  }
}
