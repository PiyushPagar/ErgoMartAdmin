import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { SendNotificationComponent } from '../send-notification/send-notification.component';

@Component({
  selector: 'app-notification-log',
  templateUrl: './notification-log.component.html',
  styleUrls: ['./notification-log.component.css'],
})
export class NotificationLogComponent implements OnInit {
  sideBarOpen = true;
  searchForm !: FormGroup;
  selected = 'option2';
  sendNotificationForm!: FormGroup;
  sendCustonNotificationForm!: FormGroup;
  displayedColumns: string[] = [
    'createdDate',
    'title',
    'body',
    'code',
    'status',
    'user',
    'delete',
  ];

  SelectMenu: string[] = [
    'createdDate',
    'title',
    'body',
    'code',
    'status',
    'user',
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
      id: '',
      title: '',
      code: '',
      body: '',
      status: '',
      date: '',
      sorting	:'id',
      isAsc :'true'
    });
    this.getAllNotifiacationLog();
    this.sendNotificationForm = this.formBuilder.group({
      code: ['', Validators.required],
    });


    this.sendCustonNotificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      code: ['custom', Validators.required],
    });
  }

  getAllNotifiacationLog() {
    const param = new HttpParams()
    .set('pagenum',0)
    .set('pagesize', GlobalComponent.totalPage)
    .set('title', this.searchForm.value.title)
    .set('code', this.searchForm.value.code)
    .set('body', this.searchForm.value.body)
    .set('status', this.searchForm.value.status)
    .set('name', this.searchForm.value.name)
    .set('date', this.searchForm.value.date)
    .set('sorting', this.searchForm.value.sorting)
    .set('isAsc', this.searchForm.value.isAsc);
    return this.http
      .get<any>(
        GlobalComponent.appUrl +
          'fetchlistofNotificationlogbyfilter',{params:param}
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.records);
          //console.log(this.searchForm.value);
          this.dataSource = new MatTableDataSource(res.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.log('error');
        },
      });
  }

  deleteProduct(id: number) {
    console.log(id);
    this.http
      .delete<any>(GlobalComponent.appUrl + 'deleteNotificationLog/' + id)
      .subscribe({
        next: (res) => {
          // alert("Product Deleted sucessfully");
          console.log(res);
          this.getAllNotifiacationLog();
        },
        error: () => {
          alert('error');
        },
      });
  }

  openSendNotificationDialog() {
    this.dialog
      .open(SendNotificationComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllNotifiacationLog();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
