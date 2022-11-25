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

  constructor(
    private userService:UserService,
    private userAuthService:UserAuthService,
    private  router:Router
    ) { }

  ngOnInit(): void {
  }

  login( loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        console.log(response);
        console.log(response.result.jwtToken);
        console.log(response.result.role);

        this.userAuthService.setRoles(response.result.role);
        this.userAuthService.setToken(response.result.jwtToken);
        const role=response.result.role;
        if(role==='ROLE_ADMIN'){
          this.router.navigate(['admin']);
        }
      },
      (error)=>{
        alert("wrong cridentails")
        console.log(error);
      }
    )
  }
}
