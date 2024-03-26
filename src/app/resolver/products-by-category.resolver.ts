import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsByCategoryResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const categoryId = route.paramMap.get('categoryId');
    return categoryId
      ? this.productService.getProductsByCategoryId(categoryId)
      : of([]);
  }
}
