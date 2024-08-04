import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isSuperAdmin: boolean = false;
  isUser:boolean=false;
  constructor(private authService: AuthService,private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.authService.isSuperAdmin$.subscribe(isSuperAdmin=>{
        this.isSuperAdmin=isSuperAdmin;
      })
      this.isLoggedIn = isAuthenticated;
      console.log(this.isLoggedIn);
    });

    this.sharedService.UserStatus$.subscribe(status => {
      this.isLoggedIn=false;
      this.isUser = status;
    });
  }
}
