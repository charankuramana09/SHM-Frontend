import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    // You might want to subscribe to authentication status changes
    // if your AuthService uses observables for this.
  }
}
