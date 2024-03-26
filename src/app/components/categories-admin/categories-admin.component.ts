import { Component } from '@angular/core';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrl: './categories-admin.component.scss',
})
export class CategoriesAdminComponent {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  filterQuery: string = '';
  sortOption: string = '';
  constructor(
    private categorieService: CategoryService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter((category) =>
      category.name.includes(this.filterQuery)
    );
  }

  createCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      height: '65vh',
      minWidth: '400px',
      data: { category: undefined },
    });

    dialogRef.afterClosed().subscribe((result: Category | undefined) => {
      if (result) {
        this.categories.push(result);
        this.filteredCategories = this.categories;
        this.messageService.add({
          severity: 'success',
          summary: 'קטגוריה נוצרה בהצלחה',
          detail: '',
        });
      }
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      height: '65vh',
      minWidth: '400px',
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result: Category | undefined) => {
      if (result) {
        this.categories = this.categories.map((product) =>
          product.id === result.id ? result : product
        );
        this.filteredCategories = this.categories;
        this.messageService.add({
          severity: 'success',
          summary: 'קטגוריה נערכה בהצלחה',
          detail: '',
        });
        this.filteredCategories = this.categories;
      }
    });
  }


  deleteCategory(id?: string) {
    if (id) {
      this.categorieService
        .delete(id)
        .pipe(take(1))
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'קטגוריה נמחקה בהצלחה',
            detail: '',
          });
          this.categories = this.categories.filter((val) => val.id !== id);
          this.filteredCategories = this.categories;
        });
    }
  }
}
