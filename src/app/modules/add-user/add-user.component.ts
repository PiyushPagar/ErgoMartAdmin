import { HttpHeaders } from '@angular/common/http';
import { AddUserService } from './../../_services/User/addusers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUserCredentials={
    firstName:"",
    lastName:"",
    email:"",
    mobileNo:"",
    password:"",
    sos:false,
  }

  userForm!: FormGroup;
  actionBtn: string = "Add User";
  minPassword=8;
  constructor(
    private formBuilder: FormBuilder,
    private addUserService: AddUserService,
    private dailogRef: MatDialogRef<AddUserComponent>,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(60),Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(60),Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['',[Validators.required, Validators.email]],
      mobileno: ['', [Validators.pattern('^[0-9]{10}$'), Validators.required,Validators.minLength(10)]],
      password: ['', [Validators.required,Validators.minLength(this.minPassword)]],
      confirmpassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

   passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmpassword')!.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmpassword')!.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmpassword')!.setErrors(null);
    }
  }



  addNewUser() {
    let headers = new HttpHeaders()
    headers = headers.set('content-type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
      if (this.userForm.valid) {
        this.addUserService.addNewUser(this.newUserCredentials,headers).subscribe({
          next: (res: any) => {
            alert('Admin Added Sucessfully'), console.log(res);
            this.userForm.reset();
            this.dailogRef.close('save');
          },
          error: () => {
            alert('User is not added');
            console.log('error to add User');
          },
        });
      }else{
        Object.keys(this.userForm.controls).forEach(field => {
          const control = this.userForm.get(field);
          control!.markAsTouched({ onlySelf: true });
        });
      }
  }


}
