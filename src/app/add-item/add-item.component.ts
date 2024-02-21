import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,

    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

    CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'

})
export class AddItemComponent {

  lendingForm: FormGroup;  // שינוי שם הטופס ל-lendingForm
  categories: string[] = ['Electronics', 'Furniture', 'Clothing', 'Books'];  // הוספת רשימת קטגוריות
  constructor(private fb: FormBuilder) {
    this.lendingForm = this.fb.group({
      category: ['', Validators.required],  // הוספת שדה קטגוריה
      productName: ['', Validators.required],
      company: ['', Validators.required],  // הוספת שדה חברה
      question: ['', Validators.required],
      description: ['', Validators.required],  // הוספת שדה תיאור
      depositOptions: ['', Validators.required],
      securityDeposit: ['', [Validators.required, Validators.min(0)]],

    });

  }

  onSubmit(form: FormGroup): void {
    if (this.lendingForm.valid) {

      console.log('פרטי הפריט:', this.lendingForm.value);
    } else {

      console.log('שגיאה: יש שדות שאינם תקינים');

    }
  }
}








