import { Component, OnInit } from '@angular/core';
import { QueryComplaintService } from '../services/query-complaint.service';

@Component({
  selector: 'app-quarys-complaints',
  templateUrl: './quarys-complaints.component.html',
  styleUrl: './quarys-complaints.component.scss'
})
export class QuarysComplaintsComponent implements OnInit {
  complaints: any[] = [];

  constructor(private queryComplaintService: QueryComplaintService) {}

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.queryComplaintService.getComplaints().subscribe((data) => {
      this.complaints = data;
    });
  }

  acceptComplaint(id: number): void {
    this.queryComplaintService.updateComplaintStatus(id, 'accepted').subscribe(() => {
      this.fetchComplaints(); // Refresh the list after updating
    });
  }

  rejectComplaint(id: number): void {
    this.queryComplaintService.updateComplaintStatus(id, 'rejected').subscribe(() => {
      this.fetchComplaints(); // Refresh the list after updating
    });
  }

}
