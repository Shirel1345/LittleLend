import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../../model/login.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onLogin() {
    this.authService.login(this.loginForm.value as LoginDto).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigateByUrl('/');
        } else {
          this.errorMessage = 'תעודת זהות או סיסמה לא נכונים';
        }
      },
      error: (err) => {
        this.errorMessage = 'תעודת זהות או סיסמה לא נכונים';
      },
    });
  }
}
