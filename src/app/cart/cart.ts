import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // <-- Import CurrencyPipe
import { CartService } from '../cart.service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // <-- Add CurrencyPipe here
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  private cartService = inject(CartService);

  constructor() { }

  /**
   * Gets the fresh list of items from the service.
   */
  getItems(): any[] {
    return this.cartService.getItems();
  }

  /**
   * Calculates the total price of all items in the cart.
   */
  getTotalPrice(): number {
    return this.cartService.getItems().reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Calls the service to remove one specific item.
   */
  removeProduct(item: any): void {
    this.cartService.removeProduct(item);
  }

  /**
   * Calls the service to clear the entire cart.
   */
  clearCart(): void {
    this.cartService.clearCart();
  }
}