import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { SafetyComponent } from './src/app/safety/safety.component';
import { CommonModule } from '@angular/common';
//import { AppComponent } from './AppComponent';
//import { SafetyComponent } from './safety/safety.component';

@NgModule({
  declarations: [
    AppComponent,
    SafetyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
