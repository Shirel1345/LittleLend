import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { Category } from '../../model/category.model';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  lendingForm = this.fb.group({
    category: ['', Validators.required],
    name: ['', Validators.required],
    company: [''],
    description: ['', Validators.required],
    securityDepositRate: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
    isReturnable: [true, Validators.required],
  });

  categories: Category[] = [];
  product?: Product = undefined;
  image?: File;
  label = 'הוספת פריט';
  submitLabel = 'הוסף פריט';
  hasImage: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.product = this.data.product;
  }

  ngOnInit(): void {
    if (this.product) {
      this.label = 'עריכת פריט';
      this.submitLabel = 'ערוך פריט';
      this.lendingForm = this.fb.group({
        category: [this.product.category, Validators.required],
        name: [this.product.name, Validators.required],
        company: [''],
        description: [this.product.description, Validators.required],
        securityDepositRate: [
          this.product.securityDepositRate,
          [Validators.required, Validators.min(0)],
        ],
        quantity: [
          this.product.quantity,
          [Validators.required, Validators.min(0)],
        ],
        isReturnable: [this.product.isReturnable, Validators.required],
      });
      this.hasImage = true;
    }

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((data: Category[]) => {
        this.categories = data;
      });
  }

  deletePicture() {
    this.hasImage = false;
    if (this.product) this.product.picture = '';
  }

  onUpload(event: FileSelectEvent) {
    if (event.currentFiles.length > 0) this.image = event.currentFiles[0];
    else this.image = undefined;
  }

  onSubmit(): void {
    if (this.hasImage || this.image) {
      this.loading = true;
      if (!this.product) {
        if (this.image) {
          let value = this.lendingForm.value as Product;
          this.productService
            .create(value, this.image)
            .pipe(take(1))
            .subscribe((res) => {
              this.dialogRef.close(res);
            });
        }
      } else {
        let value = this.lendingForm.value as Product;
        value.id = this.product.id;
        value.picture = this.product.picture;
        this.productService
          .update(value, this.image)
          .pipe(take(1))
          .subscribe((res) => {
            this.dialogRef.close(res);
          });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
