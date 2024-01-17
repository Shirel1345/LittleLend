import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';





@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
  showProducts() {
    alert('הצגת מוצרים');
  }

  loginAsAdmin() {
    alert('כניסת מנהל');

  }
  shouldShowAdminLogin: boolean = false;

  // פונקציה זו תופעל בעת לחיצה על הכפתור
  showAdminLogin() {
    this.shouldShowAdminLogin = true;
  }





}







