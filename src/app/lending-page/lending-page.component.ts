import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  templateUrl: './lending-page.component.html',
  styleUrl: './lending-page.component.css',
})
export class LendingPageComponent {
  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      this.router.navigate(['/customer-details']);
    }
  }
}
