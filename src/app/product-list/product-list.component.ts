import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';



import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';


interface Product {
  id: number;
  name: string;
  available: boolean;
}



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,
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
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


export class ProductListComponent implements OnInit {
  orderedProducts: Product[] = [];
  availableProducts: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchOrderedProducts();
    this.fetchAvailableProducts();
  }

  fetchOrderedProducts(): void {
    this.http.get<Product[]>('YOUR_ORDERED_PRODUCTS_ENDPOINT').subscribe(
      (data) => {
        this.orderedProducts = data;
      },
      (error) => {
        console.error('Error fetching ordered products:', error);
      }
    );
  }

  fetchAvailableProducts(): void {
    this.http.get<Product[]>('YOUR_AVAILABLE_PRODUCTS_ENDPOINT').subscribe(
      (data) => {
        this.availableProducts = data.filter(product => product.available);
      },
      (error) => {
        console.error('Error fetching available products:', error);
      }
    );
  }
}