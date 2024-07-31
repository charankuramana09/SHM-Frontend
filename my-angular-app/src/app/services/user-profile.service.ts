import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
// Dummy data for testing
private userProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Male',
  joiningDate: '2021-01-01',
  purpose: 'Education',
  roomSharing: 'Yes',
  frequency: 'Monthly',
  userType: 'Student',
  mobileNumber: '1234567890',
  alternativeMobileNumber: '0987654321',
  email: 'john.doe@example.com',
  idProof: 'Passport',
  status: 'Active',
  paidAmount: 1000,
  pendingAmount: 500,
  paymentHistory: 'Paid 1000 on 2021-01-01',
  roomNumber: 'A101',
  advancePayment: 200,
  hostelName: 'XYZ Hostel'
};

constructor() { }

getUserProfile(): Observable<UserProfile> {
  // In a real application, this would fetch data from the backend
  return of(this.userProfile);
}
}
