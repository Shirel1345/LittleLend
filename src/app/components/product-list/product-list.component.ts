import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { LendingPageComponent } from '../lending-page/lending-page.component';
import { MessageService } from 'primeng/api';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterQuery: string = '';
  sortOption: string = '';
  sortOptions = [
    { name: 'מהיקר לזול', code: 'higherToCheaper' },
    { name: 'מהזול ליקר', code: 'cheaperToHigher' },
    { name: 'זמין', code: 'available' },
    { name: 'ת-א', code: 'desc' },
    { name: 'א-ת', code: 'asc' },
  ];
  rates: { [id: string]: number } = {};


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((data) => {
          const products = data['products'] as Product[];
          products.forEach((val) => this.buildRate(val));
        })
      )
      .subscribe((data) => {
        this.products = data['products'];
        this.filteredProducts = data['products'];
      });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.includes(this.filterQuery.toLowerCase())
    );
  }

  createLending(product: Product): void {
    const dialogRef = this.dialog.open(LendingPageComponent, {
      height: '81vh',
      maxWidth: '500px',
      maxHeight: '700px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.messageService.add({
          severity: 'success',
          summary: 'השאלה התקבלה בהצלחה',
          detail: 'ניתן להגיע לאסוף את הפריט',
        });
      }
    });
  }

  openDetail(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: product,
      maxWidth: '500px',
      maxHeight: '80vh',
    });
  }

  buildRate(product: Product): void {
    if (product.rates && product.id) {
      let sum = 0;
      product.rates?.forEach((val) => (sum += val));
      this.rates[product.id] = sum / product.rates?.length;
    }
  }

  sortProducts() {
    this.filteredProducts = this.products;
    switch (this.sortOption) {
      case 'asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'available':
        this.filteredProducts = this.filteredProducts.filter(
          (a) => a.quantity !== 0
        );
        break;
      case 'cheaperToHigher':
        this.filteredProducts.sort(
          (a, b) => a.securityDepositRate - b.securityDepositRate
        );
        break;
      case 'higherToCheaper':
        this.filteredProducts.sort(
          (a, b) => b.securityDepositRate - a.securityDepositRate
        );
        break;
      default:
        break;
    }
  }
}
