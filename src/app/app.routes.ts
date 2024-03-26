import { Routes } from '@angular/router';
import { LendingPageComponent } from './lending-page/lending-page.component';
import { SafetyComponent } from './safety/safety.component';

export const routes: Routes = [
  { path: '', component: LendingPageComponent },
  { path: 'lending-page', component: LendingPageComponent },
  { path: 'safety', component: SafetyComponent },
];
