import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
//   hostels = [
//     { name: 'Hostel A', },
//     { name: 'Hostel B', },
//     { name: 'Hostel C', },
//     { name: 'Hostel D' }
//   ];
// frquencyType:string='Monthyly';
//   selectedHostel = this.hostels[0];
//   filteredData: any = {
//     monthlyMembers: 0,
//     weeklyMembers: 0,
//     customPeriodMembers: 0,
//     totalMembers: 0
//   };

//   constructor(private dataService: DashboardService) { }

//   ngOnInit(): void {
//     this.fetchDataForSelectedHostel();
//     console.log('this frequency'+this.frquencyType+"hostelname= "+this.selectedHostel)
//   }

//   selectHostel(hostel: any): void {
//     this.selectedHostel = hostel;
//     this.fetchDataForSelectedHostel();
//   }

//   fetchDataForSelectedHostel(): void {
//     this.dataService.getFilteredData(this.selectedHostel.name, this.frquencyType).subscribe(
//       data => {
//         this.filteredData = data;
//       },
//       error => {
//         console.error('Error fetching data', error);
//       }
//     );
  // }
}
