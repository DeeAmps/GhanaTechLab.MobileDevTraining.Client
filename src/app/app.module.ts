import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatGridListModule,
  MatCardModule, 
  MatMenuModule, 
  MatIconModule, 
  MatButtonModule, 
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSliderModule,
  MatNativeDateModule,
  MatSelectModule, 
  MatInputModule,
  MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ApiCallsService } from './services/api-calls.service';
import { Register2Component } from './register2/register2.component';
import { Register3Component } from './register3/register3.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    Register2Component,
    Register3Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSliderModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    LayoutModule,
    MatInputModule,
    FormsModule
  ],
  providers: [ApiCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
