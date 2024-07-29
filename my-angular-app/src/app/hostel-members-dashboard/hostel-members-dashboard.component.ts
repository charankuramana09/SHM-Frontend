import { Component, OnInit } from '@angular/core';
import { HostelMember, HostelService } from '../services/hostel.service';

@Component({
  selector: 'app-hostel-members-dashboard',
  templateUrl: './hostel-members-dashboard.component.html',
  styleUrl: './hostel-members-dashboard.component.scss'
})
export class HostelMembersDashboardComponent implements OnInit {
  membersData: HostelMember[] = [];

  constructor(private hostelService: HostelService) {}

  ngOnInit(): void {
    this.hostelService.getHostelMembers().subscribe(
      data => this.membersData = data,
      error => console.error('Error fetching members data', error)
    );
  }

}
