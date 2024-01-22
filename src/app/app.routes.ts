import { Routes } from '@angular/router';
import { LendingPageComponent } from './lending-page/lending-page.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: LendingPageComponent },
  { path: 'lending-page', component: LendingPageComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'products/:categoryId', component: ProductListComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];
