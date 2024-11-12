import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../user/models/product.model';
import { ProductService } from '../../../../shared/services/product.service';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';  
import { MatSortModule } from '@angular/material/sort';  

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);
  totalProducts = signal<number>(0); 
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];  
  currentPageSignal: WritableSignal<number> = signal(1);
  pageSizeSignal: WritableSignal<number> = signal(5);  

  constructor() {}


}

