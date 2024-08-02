import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';
import { HostelMember } from '../models/HostelMember';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userProfile: HostelMember[] | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfiles().subscribe((data) => {
      this.userProfile = data;
    });
  }

}
