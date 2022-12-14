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
import { OrdersDetailsComponent } from './modules/orders-details/orders-details.component';
import { EditOrderComponent } from './modules/edit-order/edit-order.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { AddNotificationComponent } from './modules/add-notification/add-notification.component';
import { SendNotificationComponent } from './modules/send-notification/send-notification.component';
import { ViewImageComponent } from './modules/view-image/view-image.component';
import { NotificationLogComponent } from './modules/notification-log/notification-log.component';




const routes: Routes = [
  
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
       
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