// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HostelDataService } from '../services/hostel-data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selectedHostel: string = ''; // Set this based on your logic
  monthlyData: any[] = [];
  weeklyData: any[] = [];
  customData: any[] = [];
  corporateData: any[] = [];
  totalCount: number = 0;

  constructor(private hostelDataService: HostelDataService) { }

  ngOnInit(): void {
    this.selectedHostel = this.hostelDataService.getHostelName();
    this.fetchAllData();
  }
  setFilterCriteria(hostelName: string): void {
    this.selectedHostel = hostelName;
    console.log(hostelName);
    this.hostelDataService.setHostelName(hostelName);
    this.fetchAllData();
  }
  fetchAllData(): void {
    this.fetchDataByFrequencyType('monthly', 'monthlyData');
    this.fetchDataByFrequencyType('weekly', 'weeklyData');
    this.fetchDataByFrequencyType('custom', 'customData');
    this.fetchDataByFrequencyType('corporate', 'corporateData');
  }

  fetchDataByFrequencyType(frequencyType: string, dataProperty: string): void {
    this.hostelDataService.getUserDetailsByFrequencyType(frequencyType, this.selectedHostel).subscribe(
      (response) => {
        this[dataProperty] = response;
        this.updateTotalCount();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateTotalCount(): void {
    this.totalCount = this.monthlyData.length + this.weeklyData.length + this.customData.length + this.corporateData.length;
  }
}
