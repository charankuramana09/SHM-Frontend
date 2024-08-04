import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HostelService } from '../services/hostel.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HostelMember } from '../models/HostelMember';

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
  frequencyType: string = '';
  hostelName: string = '';

  constructor(
    private hostelService: HostelService, 
    private route: ActivatedRoute, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadMembersFromLocalStorage();
    }

    // Load default data initially
    this.loadDefaultData();  
  }

  loadDefaultData(): void {
    this.filterCriteria = 'all'; // Reset filter criteria
    this.route.queryParams.subscribe(params => {
      this.frequencyType = params['frequencyType'] || '';
      this.hostelName = params['hostelName'] || '';
      this.fetchMembersData();
    });
  }

  fetchMembersData(): void {
    this.hostelService.getHostelMembers(this.hostelName, this.frequencyType).subscribe(
      (data: Map<string, any>[]) => {
        // Convert list of maps to HostelMember array
        this.membersData = data.map(item => ({
          userId: item['userId'],
          firstName: item['firstName'],
          lastName: item['lastName'],
          gender: item['gender'],
          joiningDate: item['joiningDate'],
          purpose: item['purpose'],
          roomSharing: item['roomSharing'],
          frequency: item['frequency'],
          userType: item['userType'],
          mobileNumber: item['mobileNumber'],
          alternateMobileNumber: item['alternateMobileNumber'],
          email: item['email'],
          idProof: item['idProof'],
          status: item['status'],
          paidAmount: item['paidAmount'],
          pendingAmount: item['pendingAmount'],
          advancePayment: item['advancePayment'],
          hostelName: item['hostelName'],
          paymentETA: item['paymentETA'],
          roomNumber: item['roomNumber'],
          roomType: item['roomType']
        }));

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
      this.applyFilters();
    }
  }

  saveMembersToLocalStorage(): void {
    try {
      localStorage.setItem('hostelMembers', JSON.stringify(this.membersData));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
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
