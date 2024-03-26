import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(private router: Router, private categoryService: CategoryService) {
    this.categories = [];
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  navigateToProducts(categoryId: string): void {
    this.router.navigate(['/products', categoryId]);
  }
  
}
