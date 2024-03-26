import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LendingPageComponent } from './components/lending-page/lending-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryComponent } from './components/category/category.component';
import { MatSelectModule } from '@angular/material/select';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { LendListComponent } from './components/lend-list/lend-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaymentMethodConvertorPipe } from './pipes/payment-method.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoanStatusConvertorPipe } from './pipes/isApproved.pipe';
import { TabViewModule } from 'primeng/tabview';
import { CategoriesAdminComponent } from './components/categories-admin/categories-admin.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ResetComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LendingPageComponent,
    LoginComponent,
    ProductListComponent,
    HomePageComponent,
    AddProductComponent,
    DashboardComponent,
    CategoryComponent,
    ProductsAdminComponent,
    LendListComponent,
    PaymentMethodConvertorPipe,
    RegisterComponent,
    ProductDetailsComponent,
    LoanStatusConvertorPipe,
    CategoriesAdminComponent,
    AddCategoryComponent,
    ResetComponent
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    BidiModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule,
    FloatLabelModule,
    CalendarModule,
    TableModule,
    ToastModule,
    InputSwitchModule,
    FileUploadModule,
    TabViewModule,
    RatingModule,
    OverlayPanelModule,
    TooltipModule
  ],
  providers: [
    { provide: Directionality, useValue: { value: 'rtl' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
