import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';
import { HostelMember } from '../models/HostelMember';
import { SharedServiceService } from '../services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userProfile: HostelMember[] | null = null;
  private subscriptions: Subscription = new Subscription();
  constructor(private userProfileService: UserProfileService,private sharedService:SharedServiceService) {}

  ngOnInit(): void {
    const email=localStorage.getItem("email");
    this.userProfileService.getUserByEmail(email).subscribe((data) => {
      this.userProfile = data;
    });
    this.subscriptions.add(
      this.sharedService.fetchUserDetailsSubject$.subscribe(() => {
        this.userProfileService.getUserByEmail(email).subscribe((data) => {
          this.userProfile = data;
        });
      })
    );

    
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up subscriptions to prevent memory leaks
  }

}
