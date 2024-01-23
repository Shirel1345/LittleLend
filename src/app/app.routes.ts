
import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { AddItemComponent } from './add-item/add-item.component';










export const routes: Routes =
    [{ path: '', component: HomePageComponent },
    { path: 'hopme-page', component: HomePageComponent },
    {
        path: '',
        redirectTo: 'admin-login',
        pathMatch: 'full'
    },

    { path: 'admin-login', component: AdminLoginComponent },


    { path: 'products', component: ProductsComponent },
    { path: 'add-item', component: AddItemComponent },

    ];




















