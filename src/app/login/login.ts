import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
   

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';

  private allowedEmail = 'admin@grocery.com';
  private allowedPassword = '12345';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.email === this.allowedEmail && this.password === this.allowedPassword) {
      this.authService.login();   
      this.router.navigate(['/products']);  
    } else {
      alert('Invalid email or password ');
    }
  }
}
