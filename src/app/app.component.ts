import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddItemComponent } from './add-item/add-item.component';


import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from "./dashboard/dashboard.component";



@Component({
    selector: 'app-root',
    standalone: true,
    providers: [HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        HomePageComponent,
        AdminLoginComponent,
        AddItemComponent,
        HttpClientModule,
        FormsModule,

        DashboardComponent
    ]
})
export class AppComponent {
    title = 'my-angular-project';
}

