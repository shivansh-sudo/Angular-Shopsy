import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  items: any[] = [];

  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.items = [];
  }
}
