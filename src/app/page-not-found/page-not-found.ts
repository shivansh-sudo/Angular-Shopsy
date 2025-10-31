import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.html',
  styleUrls: ['./page-not-found.css']
})
export class PageNotFound {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
