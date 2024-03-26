import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { take } from 'rxjs';
import { Category } from '../../model/category.model';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  name: FormControl = new FormControl('', Validators.required);
  category?: Category = undefined;
  image?: File;
  label = 'הוספת קטגוריה';
  submitLabel = 'הוסף קטגוריה';
  hasImage: boolean = false;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) {
    this.category = this.data.category;
  }

  ngOnInit(): void {
    if (this.category) {
      this.label = 'עריכת קטגוריה';
      this.submitLabel = 'ערוך קטגוריה';
      this.name = new FormControl(this.category.name, Validators.required);
      this.hasImage = true;
    }
  }

  deletePicture() {
    this.hasImage = false;
    if (this.category) this.category.picture = '';
  }

  onUpload(event: FileSelectEvent) {
    if (event.currentFiles.length > 0) this.image = event.currentFiles[0];
    else this.image = undefined;
  }

  onSubmit(): void {
    if (this.hasImage || this.image) {
      this.loading = true;
      if (!this.category) {
        if (this.image) {
          let value = {
            name: this.name.value as string,
            picture: '',
          } as Category;
          this.categoryService
            .create(value, this.image)
            .pipe(take(1))
            .subscribe((res) => {
              this.dialogRef.close(res);
            });
        }
      } else {
        let value = {
          id: this.category.id,
          name: this.name.value as string,
          picture: this.category.picture,
        } as Category;
        this.categoryService
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
