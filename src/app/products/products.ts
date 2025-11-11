import { Component, inject } from '@angular/core'; // New: imported injectimport { CommonModule } from '@angular/common';
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
export class Products {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];   
  selectedCategory: string = 'all'; 

  searchTerm: string = '';

  // New: Inject the CartService
  private cartService = inject(CartService);

  // This function now just calls the service
  addToCart(product: any) {
    this.cartService.addToCart(product); 
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
