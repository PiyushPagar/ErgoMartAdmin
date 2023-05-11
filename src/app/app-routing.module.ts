import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { LoginComponent } from './modules/login/login.component';
import { NotificationLogComponent } from './modules/notification-log/notification-log.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { OrdersComponent } from './modules/orders/orders.component';
import {UsersComponent} from './modules/users/users.component';
import { AuthGuard } from './_services/auth.guard';
import { SettingsComponent } from './modules/settings/settings.component';
import { ApplicationParameterComponent } from './modules/application-parameter/application-parameter.component';


const routes: Routes = [
  {path: "",  component: LoginComponent, pathMatch: "full"},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'inventory',component:InventoryComponent,canActivate:[AuthGuard]},
  {path:'order',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'notification',component:NotificationComponent,canActivate:[AuthGuard]},
  {path:'notificationlog',component:NotificationLogComponent,canActivate:[AuthGuard]},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},
  {path:'applicationparameter',component:ApplicationParameterComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
