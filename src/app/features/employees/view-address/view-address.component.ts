import { Component, Inject } from '@angular/core';
import { Address } from '../../../shared/models/address';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-address',
  standalone: false,
  templateUrl: './view-address.component.html',
  styleUrl: './view-address.component.css',
})
export class ViewAddressComponent {
  address: Address;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { address: Address },
    private dialogRef: MatDialogRef<ViewAddressComponent>
  ) {
    this.address = data.address;
  }

  close() {
    this.dialogRef.close();
  }
}
