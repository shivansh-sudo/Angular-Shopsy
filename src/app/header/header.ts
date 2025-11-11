// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- New: For *ngIf
import { AuthService } from '../auth.service/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

// New: Inject the services
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * New: This function is for the HTML to check if the user is logged in
   */
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * New: This function logs the user out and sends them to the login page
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
