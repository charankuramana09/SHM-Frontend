import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { HostelMember } from '../models/HostelMember';
import { HostelDataService } from '../services/hostel-data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  membersData: HostelMember[] = [];
  filteredMembers: HostelMember[] = [];
  totalMembersCount: number = 0;
  todayFeeDueCount: number = 0;
  totalFeeDueCount: number = 0;
  filterStatus: 'active' | 'inactive' = 'active';
  filterCriteria: string = 'all';
  isBrowser: boolean;

  constructor(private hostelDataService: HostelDataService) {}
  

  ngOnInit(): void {
   
    if (this.membersData.length === 0) {
     
    }
  }
  setFilterCriteria(criteria: string): void {
    this.hostelDataService.setHostelName(criteria);
    console.log(criteria);
    this.filterCriteria = criteria;
    this.applyFilters();
  }

  applyFilters(): void {
    this.calculateCounts();
  }


  calculateCounts(): void {
    this.totalMembersCount = this.membersData.filter(member => (this.filterStatus === 'active' && member.status) || (this.filterStatus === 'inactive' && !member.status)).length;
    }
}
