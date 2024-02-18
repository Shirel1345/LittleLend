import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Observable } from 'rxjs';
import { Login } from '../login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Replace with your server URL


  constructor(private http: HttpClient) { }


  getlogin(): Observable<Login> {
    return this.http.get<Login>(`${this.apiUrl}/ILogin`);
  }


}





