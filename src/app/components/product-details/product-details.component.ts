import { Component, Inject } from '@angular/core';
import { Product } from '../../model/product.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;
  rate?: number;

  constructor(
    private dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.product = this.data;
    if (this.product?.rates && this.product?.id) {
      let sum = 0;
      this.product.rates?.forEach((val) => (sum += val));
      this.rate = sum / this.product.rates?.length;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
