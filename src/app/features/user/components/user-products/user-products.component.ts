import { Component, inject, signal } from '@angular/core';
import { Category, Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../shared/services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],

})
export class UserProductsComponent {
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  selectedCategory = signal<string>('All'); 
  loading = signal(false);

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadCategories();
    this.loadAllProducts();  
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories.set(['All', ...categories]);
    });
  }

  loadAllProducts(): void {
    this.loading.set(true);
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
      this.loading.set(false);
    });
  }

  selectCategory(category: string): void {
    this.loading.set(true);
    if (category === 'All') {
      this.loadAllProducts(); // Load all products if "All" is selected
    } else {
      this.productService.getProductsByCategory(category).subscribe(products => {
        this.products.set(products);
        this.selectedCategory.set(category); 
        this.loading.set(false);
      });
    }
  }

}
