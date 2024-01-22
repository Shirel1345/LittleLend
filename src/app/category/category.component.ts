import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(private router: Router, private productService: ProductService) {
    this.categories = [];
  }

  ngOnInit() {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  navigateToProducts(categoryId: number): void {
    this.router.navigate(['/products', categoryId]);
  }
}
