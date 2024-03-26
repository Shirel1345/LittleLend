import { Component } from '@angular/core';
import { RegisterDto } from '../../model/register.interface';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      userId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          this.israeliPhoneValidator(),
        ],
      ],
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

  onRegister() {
    this.authService
      .register(this.registerForm.value as RegisterDto)
      .subscribe({
        next: (res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'הרשמה התקבלה בהצלחה',
              detail: '',
            });
            this.router.navigateByUrl('/login');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'הרשמה נכשלה',
              detail: '',
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'הרשמה נכשלה',
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

  israeliPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidPhone = /^05\d{8}$/.test(control.value);
      return isValidPhone ? null : { invalidPhoneNumber: true };
    };
  }
}
