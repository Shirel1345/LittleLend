import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  categories = [
    { name: 'Category 1', image: 'https://www.segalbaby.co.il/wp-content/uploads/2021/05/7-300x300.png', description: 'ריהוט', link: '/category1' },
    { name: 'Category 2', image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61m09VaJ68L._AC_UF894,1000_QL80_.jpg', description: 'האכלה והנקה', link: '/category2' },
    { name: 'Category 3', image: 'https://baby-smile.co.il/wp-content/uploads/2023/11/0012.jpg', description: 'מנשאים', link: '/category3' },
    { name: 'Category 4', image: 'https://www.mybaby.co.il/media/catalog/product/cache/ed18b1cef59f6bcd01f5b38db46914c1/b/r/britax-highpoint-2-stage-belt-positioning-booster-car-seat-cool-flow-gray-11.jpg', description: 'בטיחות', link: '/category4' },
    { name: 'Category 5', image: 'https://cdn.shopify.com/s/files/1/0620/4109/6404/products/24-3035-3.jpg?v=1659012804', description: ' שונות', link: '/category5' },
  ];

  navigateToCategory(link: string): void {
    // כאן ניתן להוסיף התניות או לבצע פעולות נוספות כדי לנווט לדף המתאים
    console.log('Navigating to category:', link);
  }
}




