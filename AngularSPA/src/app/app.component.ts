import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularSPA';

  constructor(private accountService:AccountService){}

  ngOnInit(){
    //Add code to check for jwt token in local storage then validate jwt and if jwt is valid then manually update behavior
    //subjects
    //add validate JWT functionality to API and account service
    //check jwt token existence in local storage then trigger JWT validation function through account service
    //JWT validation function triggers isLoggedIn Behavior subject to true
    if (localStorage.getItem('MovieShopToken') != null){
      this.accountService.validateJWT();
    };
  }
}
