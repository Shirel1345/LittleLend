import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isAdmin: Signal<boolean> = toSignal(this.authService.isAdmin(), {
    initialValue: false,
  });

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  myLoans() {
    const userId = this.authService.getUserId();
    this.router.navigate(['/loans',userId]);
  }
}
