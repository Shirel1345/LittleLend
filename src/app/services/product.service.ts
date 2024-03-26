// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategoryId(categoryId: number): Observable<Category> {
    console.log(categoryId);
    return this.http.get<Category>(`${this.apiUrl}/categories/${categoryId}`);
  }
}
