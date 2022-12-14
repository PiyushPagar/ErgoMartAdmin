import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
  selected = '';
  sendNotificationForm!: FormGroup;
  sendCustonNotificationForm!: FormGroup;
  public responseData: any;
  actionBtn : string="Send"
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dailogRef: MatDialogRef<SendNotificationComponent>,
  ) { }

  ngOnInit(): void {
    this.getAllNotifiacation();
    this.sendNotificationForm = this.formBuilder.group({
     code: [''],
    });
    this.sendCustonNotificationForm = this.formBuilder.group({
      title: ['',Validators.required],
      body: ['',Validators.required],
      code:['custom',Validators.required],
     });
  }


  sendCustomNotifications() {
    return this.http
      .post<any>(
        GlobalComponent.appUrl + 'api/auth/sendNotification',this.sendCustonNotificationForm.value
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.records);
          alert("send sucessfully");

          this.sendNotificationForm.reset();
          this.dailogRef.close('Send');
        },
        error: () => {
          //alert("error");
          console.log('error');
        },
      });
  }

  sendNotifications() {
    const param = 'code='+this.selected;
    return this.http
      .post<any>(
        GlobalComponent.appUrl + 'api/auth/sendPushNotification?'+param,{}
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.records);
          alert("send sucessfully");
          this.sendNotificationForm.reset();
          this.dailogRef.close('Send');
          
        },
        error: () => {
          console.log('error');
          console.log(param);
          
        },
      });
  }


  getAllNotifiacation() {
    return this.http
      .get<any>(
        GlobalComponent.appUrl + 'api/auth/getNotification'
      )
      .subscribe({
        next: (res) => {
          console.log("try work");
          this.responseData = res;
          // this.responseData = Array.of(this.responseData); 
          console.log(this.responseData);
        },
        error: () => {
          console.log('error');
        },
      });
  }



}
