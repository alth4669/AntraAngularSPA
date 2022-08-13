import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  isLoggedIn:boolean = false;
  isAdmin:string = "false";

  constructor(private accountService:AccountService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isLoggedIn = false;
      this.accountService.isLoggedIn.subscribe(data => {
        this.isLoggedIn = data;
        this.isAdmin = "false";
      });
      this.accountService.currentUser.subscribe(data => {
        this.isAdmin = data.isAdmin;
      });
      if ((localStorage.getItem('MovieShopToken') != null) && (this.isLoggedIn) && (this.isAdmin == "true")){
        return true;
      }
      else {
        return false;
      };
  }
}
