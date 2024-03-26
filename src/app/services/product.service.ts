// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  getProductsByCategoryId(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.baseUrl}/products/${categoryId}`
    );
  }

  create(product: Product, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('name', product.name);
    formData.append('category', product.category.toString());
    formData.append('description', product.description);
    formData.append('isReturnable', product.isReturnable.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append(
      'securityDepositRate',
      product.securityDepositRate.toString()
    );
    return this.http.post<Product>(`${environment.baseUrl}/products`, formData);
  }

  update(product: Product, file?: File): Observable<Product> {
    const formData = new FormData();
    if (file) formData.append('image', file, file.name);
    else formData.append('picture', product.picture);
    formData.append('name', product.name);
    formData.append('category', product.category.toString());
    formData.append('description', product.description);
    formData.append('isReturnable', product.isReturnable.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append(
      'securityDepositRate',
      product.securityDepositRate.toString()
    );
    return this.http.put<Product>(
      `${environment.baseUrl}/products/${product.id}`,
      formData
    );
  }

  delete(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/products/${productId}`);
  }
}
