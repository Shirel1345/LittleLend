// admin-login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';







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
    HttpClientModule,



  ],
  providers: [],


  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],

})
export class AdminLoginComponent {
  loginObj: login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new login();
  }
  onLogin() {
    debugger;
    this.http.post('http://localhost:3000/login', this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login success")
        this.router.navigateByUrl('/dashboard')

      }
      else {
        alert(res.massade)
      }
    })

  }

}




export class login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }







  // login: FormGroup;
  // showError: boolean = false;

  // constructor(private fb: FormBuilder, private http: HttpClient) {
  //  this.login = this.fb.group({
  //   Email: ['', [Validators.required, Validators.email]],
  //   Password: ['', Validators.required]
  // });
}

//submitLogin() {
//  if (this.login.invalid) {

//    this.showError = true;
//   return;
//  }

// const serverUrl = 'http://localhost:3000';


// שליחת הטופס לשרת
//this.http.post(serverUrl, this.login.value).subscribe((response: any) => {
//  console.log('Submit הושלם', response);


// });
// }


// }
