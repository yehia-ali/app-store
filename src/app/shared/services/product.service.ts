import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category, Product } from '../../features/user/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`);
  }
  
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  
}
