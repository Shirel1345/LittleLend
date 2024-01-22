import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.products = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const categoryId = +params['categoryId'];
      this.productService
        .getProductsByCategoryId(categoryId)
        .subscribe((data) => {
          console.log('in product', data);
          this.products = data.products;
        });
    });
  }
}
