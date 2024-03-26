import { Component } from '@angular/core';
import { ResetDto } from '../../model/reset.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetComponent {
  resetForm = this.fb.group(
    {
      userId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.passwordMatchValidator }
  );

  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  onReset() {
    this.authService
      .reset(this.resetForm.value as ResetDto)
      .subscribe({
        next: (res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'איפוס סיסמה התבצע בהצלחה',
              detail: '',
            });
            this.router.navigateByUrl('/login');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'האיפוס נכשל',
              detail: '',
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'האיפוס נכשל',
            detail: '',
          });
        },
      });
  }

  passwordMatchValidator(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  
}
