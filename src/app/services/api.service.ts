import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Observable } from 'rxjs';
import { ILogin } from '../login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public getlogin(): Observable<ILogin> {

    const url: string = "http://localhost:3000/login";
    return this.http.get(url, {}) as Observable<ILogin>;

  }
}
