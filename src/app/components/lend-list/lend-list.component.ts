import { Component, OnInit, ViewChild } from '@angular/core';
import { Loan, LoanStatus } from '../../model/loan.model';
import { LoanService } from '../../services/loan.service';
import { filter, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-lend-list',
  templateUrl: './lend-list.component.html',
  styleUrl: './lend-list.component.scss',
})
export class LendListComponent implements OnInit {
  loans: Loan[] = [];
  standalone: boolean = false;
  loading: boolean = true;

  filteredLoans: Loan[] = [];
  filterQuery: string = '';
  sortOption: string = '';
  sortOptions = [
    { name: 'ממתינים לאישור', code: 'pending' },
    { name: 'מאושר', code: 'approved' },
    { name: 'נדחה', code: 'reject' },
    { name: 'חדש לישן', code: 'newToOld' },
    { name: 'ישן לחדש', code: 'oldToNew' },
  ];

  @ViewChild('op') overlayPanel?: OverlayPanel;

  selectedLoan?: Loan;
  selectedLoanRate: number = 0;

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        take(1),
        tap((data) => {
          if (data['loans'] !== undefined) {
            this.loans = data['loans'];
            this.filteredLoans = this.loans;
            this.standalone = true;
            this.loading = false;
          }
        }),
        filter((data) => data['loans'] === undefined),
        switchMap(() => this.loanService.getLoans())
      )
      .subscribe((res) => {
        this.loans = res;
        this.filteredLoans = this.loans;
        this.loading = false;
      });
  }

  filterLoans() {
    this.filteredLoans = this.loans;
    this.filteredLoans = this.loans.filter((loan) =>
      loan.userId.includes(this.filterQuery.toLowerCase())
    );
  }

  sortProducts() {
    this.filteredLoans =
      this.filterQuery.length > 0
        ? this.loans.filter((loan) =>
            loan.userId.includes(this.filterQuery.toLowerCase())
          )
        : this.loans;
    switch (this.sortOption) {
      case 'pending':
        this.filteredLoans = this.loans.filter(
          (a) => a.isApproved === LoanStatus.Pending
        );
        break;
      case 'approved':
        this.filteredLoans = this.loans.filter(
          (a) => a.isApproved === LoanStatus.Approved
        );
        break;
      case 'reject':
        this.filteredLoans = this.loans.filter(
          (a) => a.isApproved === LoanStatus.Reject
        );
        break;
      case 'newToOld':
        this.filteredLoans.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case 'oldToNew':
        this.filteredLoans.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      default:
        break;
    }
  }

  rejectLoan(loanId: string) {
    this.loanService
      .updateStatus(loanId, LoanStatus.Reject)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          const index = this.loans.findIndex((loan) => loan.id === result.id);
          this.loans[index].isApproved = LoanStatus.Reject;
        },
      });
  }

  approveLoan(loanId: string) {
    this.loanService
      .updateStatus(loanId, LoanStatus.Approved)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          const index = this.loans.findIndex((loan) => loan.id === result.id);
          this.loans[index].isApproved = LoanStatus.Approved;
        },
      });
  }

  sendRate(loadId: string, rate: number) {
    this.loanService
      .rateMyLoan(loadId, rate)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.selectedLoan = undefined;
          this.selectedLoanRate = 0;
          if (this.overlayPanel) this.overlayPanel.hide();
          const index = this.loans.findIndex((loan) => loan.id === res.id);
          this.loans[index].rate = res.rate;
        },
        error: () => {
          this.selectedLoan = undefined;
          this.selectedLoanRate = 0;
          if (this.overlayPanel) this.overlayPanel.hide();
        },
      });
  }
}
