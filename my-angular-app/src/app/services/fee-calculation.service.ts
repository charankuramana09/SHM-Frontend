import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeCalculationService {
  private feeKey = 'hostelFees';
  private fees: { [key: number]: number } = {
    1: 1000,
    2: 900,
    3: 800,
    4: 700,
    5: 600
  };

  constructor() {
    this.loadFees();
  }

  private loadFees() {
    const storedFees = localStorage.getItem(this.feeKey);
    if (storedFees) {
      this.fees = JSON.parse(storedFees);
    }
  }

  private saveFees() {
    localStorage.setItem(this.feeKey, JSON.stringify(this.fees));
  }

  getFee(sharing: number): number {
    return this.fees[sharing] || 0;
  }

  setFee(sharing: number, fee: number) {
    this.fees[sharing] = fee;
    this.saveFees();
  }
}
