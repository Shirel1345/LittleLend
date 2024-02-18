// admin-login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '../login.interface';






@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [




    MatIconModule,
    RouterModule,

    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [],


  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],

})




export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loginResponse: any;

  constructor(private http: HttpClient) { }

  login() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:3000/login', loginData).subscribe(
      (response: any) => {
        console.log('התחברות מוצלחת:', response.message);
        this.loginResponse = response; // שמירת התשובה במשתנה
        console.log('response:', response);

      },
      (error) => {
        console.error('שגיאה במהלך התחברות:', error.error.message);
        this.loginResponse = error; // שמירת התשובה במשתנה

      }
    );
  }
}



