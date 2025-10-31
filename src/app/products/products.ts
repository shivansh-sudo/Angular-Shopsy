import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];   
  selectedCategory: string = 'all'; 

  searchTerm: string = '';

   addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(product.name + ' added to cart!');
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://dummyjson.com/products').subscribe((data) => {
      this.products = data.products;
      this.filteredProducts = this.products;

      // extract unique categories
      this.categories = Array.from(new Set(this.products.map(p => p.category)));
    });
  }

  searchProducts() {
    this.applyFilters();
  }

  filterByCategory() {
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredProducts = this.products
      .filter((p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter((p) =>
        this.selectedCategory === 'all' ? true : p.category === this.selectedCategory
      );
      
  }
}
