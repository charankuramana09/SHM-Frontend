import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HostelMember } from '../models/HostelMember';
import { HostelService } from '../services/hostel.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hostel-members-dashboard',
  templateUrl: './hostel-members-dashboard.component.html',
  styleUrls: ['./hostel-members-dashboard.component.scss']
})
export class HostelMembersDashboardComponent implements OnInit {
  membersData: HostelMember[] = [];
  filteredMembers: HostelMember[] = [];
  totalMembersCount: number = 0;
  todayFeeDueCount: number = 0;
  totalFeeDueCount: number = 0;
  filterStatus: 'active' | 'inactive' = 'active';
  filterCriteria: string = 'all';
  isBrowser: boolean;

  constructor(private hostelService: HostelService, @Inject(PLATFORM_ID) private platformId: Object) {this.isBrowser = isPlatformBrowser(this.platformId);}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadMembersFromLocalStorage();
    }
   
      this.getAllMembers();
    
  }

  getAllMembers(): void {
    this.hostelService.getHostelMembers().subscribe(
      (data: HostelMember[]) => {
        this.membersData = data;
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
          this.saveMembersToLocalStorage();
        }
       
        this.applyFilters();
      },
      error => console.error('Error fetching members data', error)
    );
  }

  loadMembersFromLocalStorage(): void {
    const storedMembers = localStorage.getItem('hostelMembers');
    if (storedMembers) {
      this.membersData = JSON.parse(storedMembers);
    }
  }

  saveMembersToLocalStorage(): void {
    localStorage.setItem('hostelMembers', JSON.stringify(this.membersData));
  }

  setFilterCriteria(criteria: string): void {
    this.filterCriteria = criteria;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredMembers = this.membersData.filter(member => this.matchFilters(member));
    this.calculateCounts();
  }

  matchFilters(member: HostelMember): boolean {
    const today = new Date();
    const isStatusMatch = (this.filterStatus === 'active' && member.status) || (this.filterStatus === 'inactive' && !member.status);
    let isCriteriaMatch = false;

    switch(this.filterCriteria) {
      case 'all':
        isCriteriaMatch = true;
        break;
      case 'todayDue':
        const dueDate = new Date(member.paymentETA);
        isCriteriaMatch = today.getDate() === dueDate.getDate() && today.getMonth() === dueDate.getMonth();
        break;
      case 'totalDue':
        isCriteriaMatch = member.pendingAmount > 0;
        break;
      default:
        isCriteriaMatch = true;
        break;
    }

    return isStatusMatch && isCriteriaMatch;
  }

  calculateCounts(): void {
    this.totalMembersCount = this.membersData.filter(member => (this.filterStatus === 'active' && member.status) || (this.filterStatus === 'inactive' && !member.status)).length;
    this.todayFeeDueCount = this.membersData.filter(member => {
      const today = new Date();
      const dueDate = new Date(member.paymentETA);
      return today.getDate() === dueDate.getDate() && today.getMonth() === dueDate.getMonth() && member.status === (this.filterStatus === 'active');
    }).length;
    this.totalFeeDueCount = this.membersData.filter(member => member.pendingAmount > 0 && member.status === (this.filterStatus === 'active')).length;
  }
}
