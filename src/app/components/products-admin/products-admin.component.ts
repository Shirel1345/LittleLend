import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.scss',
})
export class ProductsAdminComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterQuery: string = '';
  sortOption: string = '';
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.includes(this.filterQuery)
    );
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '85vh',
      data: { product: undefined },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.products.push(result);
        this.filteredProducts = this.products;
        this.messageService.add({
          severity: 'success',
          summary: 'פריט נוצר בהצלחה',
          detail: '',
        });
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '85vh',
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.products = this.products.map((product) =>
          product.id === result.id ? result : product
        );
        this.filteredProducts = this.products;
        this.messageService.add({
          severity: 'success',
          summary: 'פריט נערך בהצלחה',
          detail: '',
        });
        this.filteredProducts = this.products;
      }
    });
  }

  deleteProduct(id?: string) {
    if (id) {
      this.productService
        .delete(id)
        .pipe(take(1))
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'פריט נמחק בהצלחה',
            detail: '',
          });
          this.products = this.products.filter((val) => val.id !== id);
          this.filteredProducts = this.products;
        });
    }
  }
}
