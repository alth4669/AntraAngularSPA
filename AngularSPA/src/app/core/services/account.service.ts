import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserLoginModel } from 'src/app/shared/models/UserLoginModel';
import { UserRegisterModel } from 'src/app/shared/models/UserRegisterModel';
import { ActiveUserModel } from 'src/app/shared/models/ActiveUserModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject = new BehaviorSubject<any>({} as any);
  public currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();
  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) {}

  Login(login:UserLoginModel):Observable<boolean> {
    return this.http.post("https://localhost:7174/api/Account/Login", login).pipe(map((response:any) => {
      if (response) {
        localStorage.setItem('MovieShopToken', response.token);
        this.populateUserInfoFromToken();
        return true;
      }
      return false;
    }));
  }

  populateUserInfoFromToken() {
    var token = localStorage.getItem("MovieShopToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next(decodedToken);
      this.isLoggedInSubject.next(true);
    }
  }

  Logout() {
    localStorage.removeItem("MovieShopToken");
    this.currentUserSubject.next({} as ActiveUserModel);
    this.isLoggedInSubject.next(false);
  }

  Register(register:UserRegisterModel):Observable<boolean> {
    return this.http.post<boolean>("https://localhost:7174/api/Account/Register", register);
  }
}
