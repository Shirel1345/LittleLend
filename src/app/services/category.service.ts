import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/categories`);
  }

  create(category: Category, file: File): Observable<Category> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('name', category.name);
    return this.http.post<Category>(
      `${environment.baseUrl}/categories`,
      formData
    );
  }

  update(category: Category, file?: File): Observable<Category> {
    const formData = new FormData();
    if (file) formData.append('image', file, file.name);
    else formData.append('picture', category.picture || '');
    formData.append('name', category.name);

    return this.http.put<Category>(
      `${environment.baseUrl}/categories/${category.id}`,
      formData
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/categories/${id}`);
  }
}
