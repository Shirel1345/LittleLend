import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomePageComponent } from './home-page/home-page.component';

import { FormsModule } from '@angular/forms';





import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [

        CommonModule,
        RouterOutlet,
        HomePageComponent,
        AdminLoginComponent,

        HttpClientModule,

        FormsModule,


    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'my-angular-project';
}