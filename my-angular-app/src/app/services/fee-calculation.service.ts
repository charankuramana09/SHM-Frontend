import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeCalculationService {
  private baseFee = 1000; // Base fee for a single person

  getFee(sharing: number): number {
    if (sharing < 1 || sharing > 5) {
      throw new Error('Invalid number of sharing members');
    }
    return this.baseFee / sharing;
  }
}
