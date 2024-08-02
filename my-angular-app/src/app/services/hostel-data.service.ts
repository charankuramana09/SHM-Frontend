import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostelDataService {
  hostelName: string = '';

  setHostelName(name: string) {
    this.hostelName = name;
  }

  getHostelName() {
    return this.hostelName;
  }
}
