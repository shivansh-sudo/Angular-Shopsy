import { Component, inject } from '@angular/core'; // New: imported injectimport { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../cart.service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];   
  selectedCategory: string = 'all'; 

  searchTerm: string = '';
  totalProducts = 0;
  currentPage = 1;
  limit = 8;
  

  // New: Inject the CartService
  private cartService = inject(CartService);

  // This function now just calls the service
  addToCart(product: any) {
    this.cartService.addToCart(product); 
  }
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
    
  }
  fetchProducts() {
    const skip = (this.currentPage - 1) * this.limit;
    let url = `https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`;

    if (this.selectedCategory !== 'all') {
      url = `https://dummyjson.com/products/category/${this.selectedCategory}?limit=${this.limit}&skip=${skip}`;
    }
  console.log("Fetching URL:", url);
    this.http.get<any>(url).subscribe((data) => {
      this.products = data.products || data;
      this.totalProducts = data.total || this.products.length;
      this.applySearch();
    });
  }
    fetchCategories() {
  this.http.get<any>('https://dummyjson.com/products/categories').subscribe((data) => {
    
    this.categories = data.map((cat: any) => typeof cat === 'string' ? cat : cat.slug);
  });
}

  searchProducts() {
    this.applySearch();
  }

  applySearch() {
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter((p) =>
        p.title.toLowerCase().includes(term)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

   filterByCategory() {
    this.currentPage = 1; 
    this.fetchProducts();
  }
  nextPage() {
    if (this.currentPage * this.limit < this.totalProducts) {
      this.currentPage++;
      this.fetchProducts();
    }
  }

prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }
}