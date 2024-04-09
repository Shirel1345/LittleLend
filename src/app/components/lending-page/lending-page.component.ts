import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../model/product.model';
import { LoanService } from '../../services/loan.service';
import { CreateLoanDto, Loan, PaymentMethod } from '../../model/loan.model';
import { take } from 'rxjs';
import { PAYMENT_METHODS } from '../../constant/paymentMethod.const';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lending-page',
  templateUrl: './lending-page.component.html',
  styleUrls: ['./lending-page.component.scss'],
})
export class LendingPageComponent implements OnInit {
  loanForm = this.fb.group({
    userId: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        this.israeliPhoneValidator(),
      ],
    ], //ToDo : Remove this
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    paymentMethod: [
      undefined,
      [Validators.required, Validators.min(0), Validators.max(2)],
    ],
  });

  paymentsMethods = PAYMENT_METHODS;

  productName: string = '';
  productId: string = '';
  userId: string = '';

  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LendingPageComponent>,
    private loanService: LoanService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit(): void {
    this.productId = this.data.id as string;
    this.productName = this.data.name;
    this.userId = this.authService.getUserId() || '';

    this.authService
      .getDetails()
      .pipe(take(1))
      .subscribe((details) => {
        this.loanForm.controls.userId.setValue(details.userId);
        this.loanForm.controls.phone.setValue(details.phone);
        this.loanForm.controls.userId.disable();
      });
  }

  select(event: Date) {
    if (
      this.loanForm.controls.endDate.value &&
      event > this.loanForm.controls.endDate.value
    )
      this.loanForm.controls.endDate.setValue(event);
  }

  israeliPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidPhone = /^05\d{8}$/.test(control.value);
      return isValidPhone ? null : { invalidPhoneNumber: true };
    };
  }

  dateRangeValidator(): ValidationErrors | null {
    const startDate = this.loanForm.controls.startDate?.value;
    const endDate = this.loanForm.controls.endDate?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateBeforeStartDate: true };
    }
    return null;
  }

  onSubmit(): void {
    const formValue = this.loanForm.value;
    debugger
    const value: CreateLoanDto = {
      productId: this.productId,
      userId: this.userId,
      startDate: formValue.startDate || new Date(),
      endDate: formValue.endDate || new Date(),
      paymentMethod: formValue.paymentMethod as any,
    };

    this.loanService
      .create(value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: () => this.dialogRef.close(undefined),
      });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
