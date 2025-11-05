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
  paginatedProducts: any[] = [];
  categories: string[] = [];   
  selectedCategory: string = 'all'; 

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

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
      this.filteredProducts = [...this.products];

      this.categories = [...new Set(this.products.map((p) => p.category))];
      this.updatePagination();
    });
  }

  searchProducts() {
    this.applyFilters();
  }

  filterByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (p) => p.category === this.selectedCategory
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  private applyFilters() {
    this.filteredProducts = this.products
      .filter((p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      this.currentPage = 1;
    this.updatePagination();
      
  }
  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredProducts.length) {
      this.currentPage++;
      this.updatePagination();
    }
}
prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
