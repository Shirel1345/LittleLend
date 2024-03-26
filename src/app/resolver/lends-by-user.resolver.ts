import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Loan } from '../model/loan.model';
import { LoanService } from '../services/loan.service';

@Injectable({
  providedIn: 'root',
})
export class LendsByUserResolver implements Resolve<Loan[] | undefined> {
  constructor(private loansService: LoanService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Loan[] | undefined> {
    const userId = route.paramMap.get('userId');
    return userId
      ? this.loansService
          .getLoanByUser(userId)
          .pipe(catchError(() => of([])))
      : of(undefined);
  }
}
