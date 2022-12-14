import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationApiService } from 'src/app/_services/notification-api.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {


   
  notificationForm!: FormGroup;
  actionBtn : string="Add"
  constructor(
    private formBuilder: FormBuilder,
    private api: NotificationApiService,
    private dailogRef: MatDialogRef<AddNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) { }

  ngOnInit(): void {

    this.notificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      body: ['', Validators.required],
      status: ['', Validators.required]
    });
    console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update"
      this.notificationForm.controls['title'].setValue(this.editData.title);
      this.notificationForm.controls['code'].setValue(this.editData.code);
      this.notificationForm.controls['name'].setValue(this.editData.name);
      this.notificationForm.controls['body'].setValue(this.editData.body);
      this.notificationForm.controls['status'].setValue(this.editData.status);
    }

  }


  addNotification() {
    console.log(this.notificationForm.value);
    if(!this.editData){
      if (this.notificationForm.valid) {
        this.api.postNotification(this.notificationForm.value).subscribe({
          next: (res) => {
            alert('Product Added Sucessfully'), console.log(res);
            this.notificationForm.reset();
            this.dailogRef.close('save');
          },
          error: () => {
            alert('Product is not added');
            console.log('error to add product');
          },
        });
      }
    }else{
      this.updateNotification();
    }
  }

  updateNotification(){
    console.log("sai");
    this.api.putNotification(this.notificationForm.value,this.editData.id)
    .subscribe({
      next:(res : any)=>{
        alert("Notification updated sucessful");
        console.log(res);
        this.notificationForm.reset;
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("error")
      }
    })
  }

}
