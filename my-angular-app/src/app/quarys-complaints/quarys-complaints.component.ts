import { Component, OnInit } from '@angular/core';
import { ComplaintFormResponseDTO, QueryComplaintService, Status } from '../services/query-complaint.service';

@Component({
  selector: 'app-quarys-complaints',
  templateUrl: './quarys-complaints.component.html',
  styleUrl: './quarys-complaints.component.scss'
})
export class QuarysComplaintsComponent implements OnInit {
  complaints: any[] = [];
  dbcomplaints: ComplaintFormResponseDTO[] = [];

  constructor(private queryComplaintService: QueryComplaintService) {}

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.queryComplaintService.getComplaints().subscribe((data) => {
      this.complaints = data;
    });
    //db data
    this.queryComplaintService.getAllComplaints().subscribe(data => {
      this.dbcomplaints = data;
      console.log(this.dbcomplaints);
    });
  }

  acceptComplaint(id: number): void {
    const status: Status = Status.accepted;
    if (id) {
      this.queryComplaintService.updateComplaintStatus(id, status).subscribe(() => {
        this.fetchComplaints(); // Refresh the list after updating
      }, error => {
        console.error("Error updating complaint status:", error);
      });
    } else {
      console.error("Complaint ID is undefined.");
    }
  }
  
  
  

  rejectComplaint(complaintId: number): void {
    const status: Status = Status.rejected;
    this.queryComplaintService.updateComplaintStatus(complaintId, status ).subscribe(() => {
      this.fetchComplaints(); // Refresh the list after updating
    });
  }

}
