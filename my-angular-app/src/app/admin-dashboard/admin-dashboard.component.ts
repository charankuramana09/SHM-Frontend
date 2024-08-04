// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HostelDataService } from '../services/hostel-data.service';

import { Router, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selectedHostel: string = '';
  monthlyData: any[] = [];
  weeklyData: any[] = [];
  customData: any[] = [];
  corporateData: any[] = [];
  totalCount: number = 0;


  constructor(private authService:AuthService, private hostelDataService: HostelDataService,private router: Router,   private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    this.authService.roles$.subscribe(roles => {
      if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN') || roles.includes('ROLE_SUPERVISOR')) {
        this.selectedHostel = this.hostelDataService.getHostelName();
        this.sharedService.fetchData$.subscribe(() => this.fetchAllData());
      } else {
        // Redirect or show an error if the user doesn't have the right role
        this.router.navigate(['/unauthorized']); // Adjust this route as needed
      }
    });
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
  navigateToDashboard(frequencyType: string): void {
    this.router.navigate(['dashboard'], { queryParams: { frequencyType: frequencyType, hostelName: this.selectedHostel } });
  }
  
}
