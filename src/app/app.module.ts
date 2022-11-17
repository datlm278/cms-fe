import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ProducerComponent } from './admin/producer/producer.component';
import { CinemaComponent } from './admin/cinema/cinema.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {CinemaTypeComponent} from "./admin/cinema-type/cinema-type.component";
import {HttpClientModule, HttpClient } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ProducerComponent,
    CinemaComponent,
    HomeComponent,
    CinemaTypeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
