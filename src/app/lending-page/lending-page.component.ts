import { Component } from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lending-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './lending-page.component.html',
  styleUrls: ['./lending-page.component.css'], // השנוי כאן, נכנסת לקובץ CSS ולא styleUrl
})
export class LendingPageComponent {
  loanForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      productName: ['', Validators.required],
      loanDate: ['', Validators.required],
      returnLoanDate: ['', Validators.required],
      depositOptions: ['', Validators.required],
      securityDeposit: ['', [Validators.required, Validators.min(0)]],
    });

    // You can add custom validators for date fields here
    this.loanForm.get('loanDate')?.setValidators(this.dateValidator);
    this.loanForm.get('returnLoanDate')?.setValidators(this.dateValidator);
  }

  // Custom date validator function
  dateValidator(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    // Check if the selected date is before the current date
    if (selectedDate <= currentDate) {
      return { invalidDate: true };
    }

    return null;
  }
  onSubmit(form: FormGroup): void {
    if (form.valid) {
      // Your form submission logic here
      console.log('Form submitted:', form.value);
    } else {
      // Handle form validation errors or display a message
      console.log('Form is invalid. Please check the fields.');
    }
  }
}

