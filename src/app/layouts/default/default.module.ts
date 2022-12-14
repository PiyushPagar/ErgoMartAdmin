import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { InventoryComponent } from 'src/app/modules/inventory/inventory.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddproductComponent } from 'src/app/modules/addproduct/addproduct.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
import { OrdersComponent } from 'src/app/modules/orders/orders.component';
import { OrdersDetailsComponent } from 'src/app/modules/orders-details/orders-details.component';
import { EditOrderComponent } from 'src/app/modules/edit-order/edit-order.component';
import { NotificationComponent } from 'src/app/modules/notification/notification.component';
import { AddNotificationComponent } from 'src/app/modules/add-notification/add-notification.component';
import { SendNotificationComponent } from 'src/app/modules/send-notification/send-notification.component';
import { ViewImageComponent } from 'src/app/modules/view-image/view-image.component';
import { NotificationLogComponent } from 'src/app/modules/notification-log/notification-log.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    DefaultComponent,
    AdminComponent,
    InventoryComponent,
    AddproductComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    EditOrderComponent,
    NotificationComponent,
    AddNotificationComponent,
    SendNotificationComponent,
    ViewImageComponent,
    NotificationLogComponent,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatSliderModule
  ]
})
export class DefaultModule { }


// Important import
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatTreeModule} from '@angular/material/tree';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatSortModule} from '@angular/material/sort';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatIconModule} from '@angular/material/icon';
// import {MatInputModule} from '@angular/material/input';
// import {MatListModule} from '@angular/material/list';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatBadgeModule} from '@angular/material/badge';
// import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// import {MatButtonModule} from '@angular/material/button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';