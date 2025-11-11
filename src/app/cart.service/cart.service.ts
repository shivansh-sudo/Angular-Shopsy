import { Injectable, inject } from '@angular/core'; // <-- New: imported 'inject'
import { Router } from '@angular/router'; // <-- New: import the Router
import { AuthService } from '../auth.service/auth.service'; // <-- New: import the AuthService

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // New: Inject the AuthService and Router
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  getItems(): any[] {
    return this.getCart();
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }

  removeProduct(itemToRemove: any): void {
    let cart = this.getCart();
    let newCart = cart.filter(item => item.id !== itemToRemove.id);
    this.saveCart(newCart);
  }

  private getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  private saveCart(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // --- This is the updated function ---
  addToCart(product: any): void {

    // NEW: This is the security check
    if (!this.authService.isLoggedIn()) {
      // 1. If the user is NOT logged in, show an alert
      alert('You must be logged in to add items to your cart.');
      // 2. Redirect them to the login page
      this.router.navigate(['/login']);
      // 3. Stop the rest of the function from running
      return; 
    }

    // --- If the user IS logged in, the original code runs ---
    let cart = this.getCart();
    
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < 5) {
        existingProduct.quantity += 1;
        alert(`Added another ${product.title}. You now have ${existingProduct.quantity}.`);
      } else {
        alert('You can only add a maximum of 5 units of this product.');
      }
    } else {
      cart.push({ ...product, quantity: 1 });
      alert(`${product.title} has been added to your cart.`);
    }

    this.saveCart(cart);
  }
}