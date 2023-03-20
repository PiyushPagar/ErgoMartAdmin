import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  constructor(
    private userService:UserService,
    private userAuthService:UserAuthService,
    private  router:Router
    ) { }

  ngOnInit(): void {
  }

  OnSubmit() {

    if (
      this.credentials.email != '' &&
      this.credentials.password != '' &&
      this.credentials.email != null &&
      this.credentials.password != null
    ) {
      console.log('form is submitted');
      this.userAuthService.doLogin(this.credentials).subscribe(
        (response:any)=>{
            console.log(response.result.id);
            this.userAuthService.setUserInfo(response.result);
            this.userAuthService.setToken(response.result.jwtToken);
            this.userAuthService.setRoles(response.result.role);
            // console.log(this.loginService.isLoggedIn());
              window.location.href="/admin";
        },
        error=>{
          console.log(error);
        }
      )

    }else{

      alert("field is empty")
    }
  }
}
