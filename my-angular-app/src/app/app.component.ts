import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showNavbar: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

//   ngOnInit(): void {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         const isAuthPage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/signup';
//         this.authService.isAuthenticated$.subscribe(isLoggedIn => {
//           if (isLoggedIn) {
//             this.authService.isSuperAdmin$.subscribe(isSuperAdmin => {
//               this.showNavbar = !isAuthPage;
//             });
//           } else {
//             this.showNavbar = false;
//           }
//         });
//       }
//     });
//   }
}
