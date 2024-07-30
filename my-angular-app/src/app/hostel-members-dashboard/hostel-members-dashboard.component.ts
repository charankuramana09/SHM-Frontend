import { Component, OnInit } from '@angular/core';
import { HostelMember, HostelService } from '../services/hostel.service';

@Component({
  selector: 'app-hostel-members-dashboard',
  templateUrl: './hostel-members-dashboard.component.html',
  styleUrl: './hostel-members-dashboard.component.scss'
})
export class HostelMembersDashboardComponent implements OnInit {
  membersData: HostelMember[] = [];
  filteredMembers: HostelMember[] = [];
  totalMembersCount: number = 0;
  todayFeeDueCount: number = 0;
  totalFeeDueCount: number = 0;
  filterStatus: 'active' | 'inactive' = 'active';
  filterCriteria: string = 'all';


  constructor(private hostelService: HostelService) {}

  ngOnInit(): void {
    this.getAllMembers();
    this.hostelService.getHostelMembers().subscribe(
      data => this.membersData = data,
      error => console.error('Error fetching members data', error)
    );
  }
  getAllMembers(): void {
    this.hostelService.getHostelMembers().subscribe((data: HostelMember[]) => {
      this.membersData = data;
      // this.calculateCounts();
      this.applyFilters();
    });
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
    const isStatusMatch = member.status === this.filterStatus;
    let isCriteriaMatch = false;

    switch(this.filterCriteria) {
      case 'all':
        isCriteriaMatch = true;
        break;
      case 'todayDue':
        const joiningDate = new Date(member.joiningDate);
        const dueDate = new Date(joiningDate);
        dueDate.setMonth(joiningDate.getMonth() + 1);
        isCriteriaMatch = today.getDate() === dueDate.getDate() && today.getMonth() === dueDate.getMonth();
        break;
      case 'totalDue':
        isCriteriaMatch = member.pendingFee > 0;
        break;
      default:
        isCriteriaMatch = true;
        break;
    }

    return isStatusMatch && isCriteriaMatch;
  }

  calculateCounts(): void {
    this.totalMembersCount = this.membersData.filter(member => member.status === this.filterStatus).length;
    this.todayFeeDueCount = this.membersData.filter(member => {
      const today = new Date();
      const joiningDate = new Date(member.joiningDate);
      const dueDate = new Date(joiningDate);
      dueDate.setMonth(joiningDate.getMonth() + 1);
      return today.getDate() === dueDate.getDate() && today.getMonth() === dueDate.getMonth()
        && member.status === this.filterStatus;
    }).length;
    this.totalFeeDueCount = this.membersData.filter(member => member.pendingFee > 0 && member.status === this.filterStatus).length;
  }

}
