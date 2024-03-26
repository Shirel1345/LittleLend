import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { LendingPageComponent } from './components/lending-page/lending-page.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsByCategoryResolver } from './resolver/products-by-category.resolver';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { LendListComponent } from './components/lend-list/lend-list.component';
import { LendsByUserResolver } from './resolver/lends-by-user.resolver';
import { ResetComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetComponent},
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoryComponent,
  },
  {
    path: 'loans/:userId',
    canActivate: [AuthGuard],
    component: LendListComponent,
    resolve: {
      loans: LendsByUserResolver,
    },
  },
  {
    path: 'products/:categoryId',
    canActivate: [AuthGuard],
    component: ProductListComponent,
    resolve: {
      products: ProductsByCategoryResolver,
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'lending-page',
    component: LendingPageComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
