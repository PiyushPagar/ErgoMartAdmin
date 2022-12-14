import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNotificationComponent } from 'src/app/modules/add-notification/add-notification.component';
import { SendNotificationComponent } from 'src/app/modules/send-notification/send-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
   
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  openAddNotificationDialog() {
    this.dialog.open(AddNotificationComponent, {
    width:'30%'
    }).afterClosed().subscribe(val=>{
     
    })
  }


  openSendNotificationDialog(){
    this.dialog.open(SendNotificationComponent, {
    width:'30%'
    }).afterClosed().subscribe(val=>{
     
    })
  }
  

}
