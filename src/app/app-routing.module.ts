import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { LoginComponent } from './modules/login/login.component';
import { NotificationLogComponent } from './modules/notification-log/notification-log.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { OrdersComponent } from './modules/orders/orders.component';
import {UsersComponent} from './modules/users/users.component';


const routes: Routes = [
  {path: "",  component: LoginComponent, pathMatch: "full"},
  {path:'admin',component:AdminComponent},
  {path:'users',component:UsersComponent},
  {path:'inventory',component:InventoryComponent},
  {path:'order',component:OrdersComponent},
  {path:'notification',component:NotificationComponent},
  {path:'notificationlog',component:NotificationLogComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
