import { Component } from '@angular/core';
import { FeeCalculationService } from '../services/fee-calculation.service';

@Component({
  selector: 'app-hostel-fee',
  templateUrl: './hostel-fee.component.html',
  styleUrls: ['./hostel-fee.component.scss']
})
export class HostelFeeComponent {
  sharingOptions = [1, 2, 3, 4, 5];
  selectedSharing = 1;
  fee: number;

  constructor(private feeCalculationService: FeeCalculationService) {
    this.updateFee();
  }

  updateFee() {
    this.fee = this.feeCalculationService.getFee(this.selectedSharing);
  }
}
