import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { ShowRevenueCardComponent } from './modules/dashboard/show-revenue-card/show-revenue-card.component';





const routes: Routes = [
  
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ShowRevenueCardComponent,
       
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        DefaultModule,
        BrowserAnimationsModule,
        SharedModule
    ]
})
export class AppModule { }