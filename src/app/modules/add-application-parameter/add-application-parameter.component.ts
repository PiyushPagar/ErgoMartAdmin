import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationParameterService } from './../../_services/applicationparameter/applicationparameter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-application-parameter',
  templateUrl: './add-application-parameter.component.html',
  styleUrls: ['./add-application-parameter.component.css']
})
export class AddApplicationParameterComponent implements OnInit {

  screenTitle="Add";
  applicationParameterForm!:FormGroup;
  addParameter={
    code: "",
    codeDesc: "",
    codeType: "",
    parentCode: "",
    shortDesc: "",
    status: ""
  }
  constructor(
    private formBuilder:FormBuilder,
    private applicationParameterService:ApplicationParameterService,
    @Inject(MAT_DIALOG_DATA) public parameterData:any,
  ) { }

  ngOnInit(): void {
    this.applicationParameterForm = this.formBuilder.group({
      code: ['', Validators.required],
      codeDesc: ['', Validators.required],
      codeType: ['', Validators.required],
      parentCode: ['', Validators.required],
      shortDesc: ['', Validators.required],
      status: ['', Validators.required],
    });
    console.log(this.parameterData);
    if(this.parameterData){
      this.screenTitle="Update";
      this.addParameter.code=this.parameterData.code;
      this.addParameter.codeDesc=this.parameterData.codeDesc;
      this.addParameter.codeType=this.parameterData.codeType;
      this.addParameter.parentCode=this.parameterData.parentCode;
      this.addParameter.shortDesc=this.parameterData.shortDesc;
      this.addParameter.status=this.parameterData.status;
    }
  }

  addApplicationParameter(){
    if(!this.parameterData){
      if(this.applicationParameterForm.valid){
        this.applicationParameterService.addApplicationParameter(this.addParameter).subscribe({
          next:(res)=>{
            this.applicationParameterForm.reset();
            alert('Parameter Added Sucessfully'),
            console.log(res);
          },
          error:(res)=>{
            alert('Something went Wrong Parameter not Added'),
            console.log(res);
          }
        });
      }
    }else{
      this.updateParameter();
    }
  }

  updateParameter(){
     if(this.applicationParameterForm.valid){
        this.applicationParameterService.updateApplicationParameter(this.applicationParameterForm.value,this.parameterData.id).subscribe({
          next:(res)=>{
            this.applicationParameterForm.reset();
            alert('Parameter Updated Sucessfully'),
            console.log(res);
          },
          error:(res)=>{
            alert('Something went Wrong Parameter not Updated'),
            console.log(res);
          }
        });
      }
  }
}
