import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryComplaintService {
  // private apiUrl = 'http://localhost:8080/api/complaints'; // URL of the Spring Boot backend

  // constructor(private http: HttpClient) { }

  // getComplaints(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  // updateComplaintStatus(id: number, status: string): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  // }

  constructor(private http:HttpClient) { }

  getComplaints(): Observable<any> {
    // Dummy data
    const dummyComplaints = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        description: 'The room was not clean.',
        status: 'pending'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        description: 'No hot water in the shower.',
        status: 'pending'
      },
      {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        description: 'The air conditioner was not working.',
        status: 'pending'
      }
    ];
    return of(dummyComplaints);
  }

  updateComplaintStatus(complaintId: number, status: Status): Observable<any> {
    console.log(`Complaint with ID ${complaintId} updated to status: ${status}`);
    return this.http.patch<ComplaintFormResponseDTO>(`http://localhost:8084/complaint/patch/${complaintId}`, { status });
  }
  getAllComplaints(): Observable<ComplaintFormResponseDTO[]> {
    return this.http.get<ComplaintFormResponseDTO[]>("http://localhost:8084/complaint/all");
  }


}
export interface ComplaintFormResponseDTO {
  complaintId: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  status: Status;
}
export enum Status {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected'
}
