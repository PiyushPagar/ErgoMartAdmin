import { ApplicationParameterService } from './../../_services/applicationparameter/applicationparameter.service';
import { ConfirmationdialogComponent } from './../confirmationdialog/confirmationdialog.component';
import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpParams, HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicationParameterComponent } from '../add-application-parameter/add-application-parameter.component';

@Component({
  selector: 'app-application-parameter',
  templateUrl: './application-parameter.component.html',
  styleUrls: ['./application-parameter.component.css']
})
export class ApplicationParameterComponent implements OnInit {

  sideBarOpen = true;
  searchParameterForm!:FormGroup;
  parametersData!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  parameterTableColumns:string[]=[
    'id',
    'code',
    'codeDesc',
    'codeType',
    'shortDesc',
    'parentCode',
    'status',
    'editParameter',
    'deleteParameter'
  ];

  constructor(
  private applicationParameterService:ApplicationParameterService,
  private http:HttpClient,
  private formBuilder:FormBuilder,
  private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchParameterForm = this.formBuilder.group({
      code: [''],
      codeDesc: [''],
      codeType: [''],
      shortDesc: [''],
      parentCode: [''],
      status: ['']
    });
    this.getAllApplicationParameters();
  }

  getAllApplicationParameters(){
    const param = new HttpParams()
      .set('pagenum', 0)
      .set('pagesize', GlobalComponent.totalPage)
      .set('code', this.searchParameterForm.value.code)
      .set('codeDesc', this.searchParameterForm.value.codeDesc)
      .set('codeType', this.searchParameterForm.value.codeType)
      .set('shortDesc', this.searchParameterForm.value.shortDesc)
      .set('parentCode', this.searchParameterForm.value.parentCode)
      .set('status', this.searchParameterForm.value.status);
    return this.http
      .get<any>(
        GlobalComponent.appUrl + 'api/auth/fetchApplicationParameterfilter',
        { params: param }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.searchParameterForm.value);
          this.parametersData = new MatTableDataSource(res.records);
          this.parametersData.paginator = this.paginator;
          this.parametersData.sort = this.sort;
        },
        error: () => {
          //alert("error");
          console.log('error');
        },
      });

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  addApplicationParameterDialog(){
    this.dialog
      .open(AddApplicationParameterComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllApplicationParameters();
      });
  }

  editParameter(row:any){
    this.dialog
      .open(AddApplicationParameterComponent, {
        width: '30%',
        data:row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllApplicationParameters();
      });
  }

  deleteParameter(paramId:any){
    console.log(paramId);
    this.dialog
    .open(ConfirmationdialogComponent, {
      width: '400px',
      height:'180px',
      data:{ message: 'Are you sure you want to delete this Parameter ?'},
    })
    .afterClosed()
    .subscribe((confirm) => {
      if(confirm){
        this.applicationParameterService.deleteApplicationParameter(paramId).subscribe({
          next:(res)=>{
            alert('Parameter Deleted Sucessfully'),
            this.getAllApplicationParameters();
            console.log(res);
          },
          error:(res)=>{
            alert('Something went Wrong parameter not deleted'),
            console.log(res);
          }
        });
      }
    });
  }
}
