import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { SendNotificationComponent } from '../send-notification/send-notification.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  sideBarOpen = true;
  searchForm!: FormGroup;
  displayedColumns: string[] = [
    'id',
    'title',
    'code',
    'name',
    'body',
    'status',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.searchForm = this.formBuilder.group({
      pagenum:0,
      id: '',
      title: '',
      code: '',
      body: '',
      status: '',
      name: '',
    });
    this.getAllNotifiacation();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openAddNotificationDialog() {
    this.dialog
      .open(AddNotificationComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllNotifiacation();
        }
      });
  }

  openSendNotificationDialog() {
    this.dialog
      .open(SendNotificationComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          // this.getAllNotifiacation();
        }
      });
  }

  getAllNotifiacation() {
    const param = new HttpParams()
      .set('pagenum',0)
      .set('pagesize', GlobalComponent.totalPage)
      .set('status', this.searchForm.value.title)
      .set('code', this.searchForm.value.code)
      .set('body', this.searchForm.value.body)
      .set('status', this.searchForm.value.status)
      .set('name', this.searchForm.value.name);
    return this.http
      .get<any>(
        GlobalComponent.appUrl + 'api/auth/fetchNotificationListfilter',
        { params: param }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.records);
          console.log(this.searchForm.value);
          this.dataSource = new MatTableDataSource(res.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.log('error');
        },
      });
  }

  editNotification(row: any) {
    this.dialog
      .open(AddNotificationComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllNotifiacation();
      });
  }

  deleteNotificationData(id: number) {
    return this.http.get<any>(GlobalComponent.appUrl+"api/auth/deleteProduct/"+id).subscribe({
      next: (res) => {
        alert('Notification Deleted sucessfully');
        console.log(res);
        this.getAllNotifiacation();
      },
      error: () => {
        alert('error');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
