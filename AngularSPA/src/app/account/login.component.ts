import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../shared/models/UserLoginModel';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:UserLoginModel = {email:"", password:""};
  submitted:boolean = false;

  flag:boolean=false;
  loginFailed:boolean=false;

  constructor(private accountService:AccountService, private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser(loginForm:NgForm) { 
    this.submitted = true;
    this.model.email = loginForm.value.email;
    this.model.password = loginForm.value.password;
    this.accountService.Login(this.model).subscribe(data => {
      if (data) {
        this.flag = true;
        setTimeout(() => {
          this._router.navigateByUrl('/');
        }, 3000);
      }
      else {
        this.loginFailed = true;
      }
    })

  }

}
