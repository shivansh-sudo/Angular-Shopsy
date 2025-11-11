// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service/auth.service';
   

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {
//   email: string = '';
//   password: string = '';

//   private allowedEmail = 'admin@grocery.com';
//   private allowedPassword = '12345';

//   constructor(private router: Router, private authService: AuthService) {}

//   onSubmit() {
//     if (this.email === this.allowedEmail && this.password === this.allowedPassword) {
//       this.authService.login();   
//       this.router.navigate(['/products']);  
//     } else {
//       alert('Invalid email or password ');
//     }
//   }
// }

import { Component, OnInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // We can remove FormsModule
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';

// This tells TypeScript that 'google' will exist globally.
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  // Note: Removed FormsModule since we no longer have ngModel
  imports: [CommonModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit { 
  
  // We have removed the 'email', 'password', and 'allowed' variables

  private ngZone = inject(NgZone);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  // We have removed the original onSubmit() function

  // --- Functions for Google Sign-In ---

  private initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '583526741465-d3seeou0o4ouu3k1ciq7af9jsobjqp6p.apps.googleusercontent.com', // Your Client ID
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('gsi-login-button'), 
      { theme: 'outline', size: 'large' }
    );
  }

  private handleCredentialResponse(response: any): void {
    if (response.credential) {
      console.log('Google Sign-In successful. Token:', response.credential);

      this.ngZone.run(() => {
        this.authService.login();
        this.router.navigate(['/products']);
      });
    }
  }
}