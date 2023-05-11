import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationParameterService } from './../../_services/applicationparameter/applicationparameter.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {

  constructor(
    private applicationParameterService:ApplicationParameterService,
    @Inject(MAT_DIALOG_DATA) public parentData:any,
  ) { }

  ngOnInit(): void {

  }

}
