import { Component, OnInit } from '@angular/core';
import { FeeCalculationService } from '../services/fee-calculation.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hostel-fee',
  templateUrl: './hostel-fee.component.html',
  styleUrls: ['./hostel-fee.component.scss']
})
export class HostelFeeComponent implements OnInit {
  sharingOptions = [1, 2, 3, 4, 5];
  selectedSharing = 1;
  fee: number;
  newFee: number;
  isSuperAdmin: boolean;

  constructor(
    private feeCalculationService: FeeCalculationService,
    private authService: AuthService
  ) {
    this.authService.isSuperAdmin$.subscribe(isSuperAdmin => {
      this.isSuperAdmin = isSuperAdmin;
      console.log('Is SuperAdmin (Component):', this.isSuperAdmin);
    });
  }

  ngOnInit() {
    this.updateFee();
  }

  updateFee() {
    this.fee = this.feeCalculationService.getFee(this.selectedSharing);
  }

  setFee() {
    if (this.isSuperAdmin && this.newFee > 0) {
      this.sharingOptions.forEach(option => {
        const adjustedFee = this.calculateAdjustedFee(option, this.newFee);
        this.feeCalculationService.setFee(option, adjustedFee);
      });
      this.updateFee();
    }
  }

  calculateAdjustedFee(sharing: number, baseFee: number): number {
    return baseFee / sharing;
  }
}
