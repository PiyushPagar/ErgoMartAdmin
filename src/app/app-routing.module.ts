import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { LoginComponent } from './modules/login/login.component';
import { NotificationLogComponent } from './modules/notification-log/notification-log.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { AuthGuard } from './_services/auth.guard';


const routes: Routes = [
  {path: "",  component: LoginComponent, pathMatch: "full"},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'inventory',component:InventoryComponent,canActivate:[AuthGuard]},
  {path:'order',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'notification',component:NotificationComponent,canActivate:[AuthGuard]},
  {path:'notificationlog',component:NotificationLogComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }