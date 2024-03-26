import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateLoanDto, Loan, LoanStatus } from '../model/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${environment.baseUrl}/loans`);
  }

  getLoanByUser(userId: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${environment.baseUrl}/loans/${userId}`);
  }

  create(loan: CreateLoanDto): Observable<Loan> {
    return this.http.post<Loan>(`${environment.baseUrl}/loans`, loan);
  }

  update(loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${environment.baseUrl}/loans/${loan.id}`, loan);
  }

  updateStatus(loanId: string, status: LoanStatus): Observable<Loan> {
    return this.http.patch<Loan>(
      `${environment.baseUrl}/loans/${loanId}/approve`,
      { isApproved: status }
    );
  }

  rateMyLoan(loanId: string, rate: number): Observable<Loan> {
    return this.http.patch<Loan>(
      `${environment.baseUrl}/loans/${loanId}/rate`,
      { rate: rate }
    );
  }

  delete(loansId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/loans/${loansId}`);
  }
}
