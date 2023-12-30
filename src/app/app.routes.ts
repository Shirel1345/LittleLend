import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { LendingPageComponent } from './lending-page/lending-page.component';

export const routes: Routes = [
  { path: 'lending-page', component: LendingPageComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
];
