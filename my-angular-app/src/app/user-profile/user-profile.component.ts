import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userProfile: UserProfile | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
    });
  }

}
