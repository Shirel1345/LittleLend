import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto } from '../model/login.interface';
import { RegisterDto } from '../model/register.interface';
import { ResetDto } from '../model/reset.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginObj: LoginDto): Observable<boolean> {
    return this.http
      .post<{ token: string; userId: string }>(
        `${environment.baseUrl}/auth/login`,
        loginObj
      )
      .pipe(
        map((response) => {
          const token = response.token;
          const userId = response.userId;
          if (token) {
            localStorage.setItem(environment.tokenKey, token);
            localStorage.setItem(environment.userIdKey, userId);
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  register(registerObj: RegisterDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.baseUrl}/auth/register`, registerObj)
      .pipe(
        catchError((error) => {
          console.error('Register error:', error);
          return of(false);
        })
      );
  }

  reset(resetObj: ResetDto): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.baseUrl}/auth/reset`, resetObj)
      .pipe(
        catchError((error) => {
          console.error('Reset error:', error);
          return of(false);
        })
      );
  }

  isAuthorized(): Observable<boolean> {
    return this.http.get<string>(`${environment.baseUrl}/auth/role`).pipe(
      map((val) => val === 'User' || val === 'Admin'),
      catchError(() => {
        return of(false);
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<string>(`${environment.baseUrl}/auth/role`).pipe(
      map((val) => val === 'Admin'),
      catchError(() => {
        return of(false);
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem(environment.userIdKey);
  }

  getDetails(): Observable<{ userId: string; phone: string }> {
    return this.http
      .get<{ userId: string; phone: string }>(
        `${environment.baseUrl}/auth/details`
      )
      .pipe(
        catchError(() => {
          return of({ userId: '', phone: '' });
        })
      );
  }

  logout(): void {
    localStorage.removeItem(environment.tokenKey);
  }
}
