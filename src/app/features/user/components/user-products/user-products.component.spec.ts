import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductsComponent } from './user-products.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product.model';
const mockCategories = ['All', 'Electronics', 'Clothing'];
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    category: 'Electronics',
    price: 100,
    description: 'A great electronic product',
    image: 'url/to/image1.jpg',
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: 'Product 2',
    category: 'Clothing',
    price: 50,
    description: 'A stylish piece of clothing',
    image: 'url/to/image2.jpg',
    rating: { rate: 4.0, count: 85 }
  }
];
class MockProductService {
  getCategories() {
    return of(mockCategories.slice(1));
  }
  getProducts() {
    return of(mockProducts);
  }
  getProductsByCategory(category: string) {
    return of(mockProducts.filter(p => p.category === category));
  }
}

describe('UserProductsComponent', () => {
  let component: UserProductsComponent;
  let fixture: ComponentFixture<UserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load categories on initialization', () => {
    component.loadCategories();
    expect(component.categories()).toEqual(mockCategories);
  });
  it('should load all products on initialization', () => {
    component.loadAllProducts();
    fixture.detectChanges();

    expect(component.products()).toEqual(mockProducts);
    expect(component.loading()).toBeFalse();
  });

  it('should filter products by category', () => {
    component.selectCategory('Electronics');
    fixture.detectChanges();

    expect(component.products()).toEqual([mockProducts[0]]); 
    expect(component.selectedCategory()).toBe('Electronics');
    expect(component.loading()).toBeFalse();
  });

  it('should load all products if "All" category is selected', () => {
    component.selectCategory('All');
    fixture.detectChanges();

    expect(component.products()).toEqual(mockProducts);
    expect(component.selectedCategory()).toBe('All');
    expect(component.loading()).toBeFalse();
  });

  it('should set loading to true while fetching products', () => {
    component.selectCategory('Electronics');
    expect(component.loading()).toBeTrue();

    fixture.whenStable().then(() => {
      expect(component.loading()).toBeFalse();
    });
  });


});
