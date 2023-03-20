import { AddUserComponent } from 'src/app/modules/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { HttpParams, HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sideBarOpen = true;
  displayedColumns: string[] = [
    'UserId',
    'UserName',
    'Email',
    'Password',
    'MobileNo',
    'sso',
    'role'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userId: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNo: [''],
      role: ['']
    });
    this.getAllUsers();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  getAllUsers() {
    const param = new HttpParams()
      .set('pagenum', 0)
      .set('pagesize', GlobalComponent.totalPage)
      .set('userId', this.searchForm.value.userId)
      .set('firstName', this.searchForm.value.firstName)
      .set('lastName', this.searchForm.value.lastName)
      .set('email', this.searchForm.value.email)
      .set('mobileNo', this.searchForm.value.mobileNo)
      .set('roleId', this.searchForm.value.role);
    return this.http
      .get<any>(
        GlobalComponent.appUrl + 'api/auth/fetchUsersbyfilter',
        { params: param }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.searchForm.value);
          this.dataSource = new MatTableDataSource(res.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          //alert("error");
          console.log('error');
        },
      });
  }

  addNewUSer() {
    this.dialog
      .open(AddUserComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          // this.getAllProducts();
        }
      });
  }
}
