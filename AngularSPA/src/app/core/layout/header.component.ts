import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { GenreModel } from 'src/app/shared/models/GenreModel';
import { HeaderService } from '../services/header.service';
import { ActiveUserModel } from 'src/app/shared/models/ActiveUserModel';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  genres!:GenreModel[];
  currentUser!: ActiveUserModel;
  isLoggedIn: boolean = false;

  constructor(private genreService:GenreService, private headerService:HeaderService, private accountService:AccountService, private _router:Router) { }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(g => {
      this.genres = g;
      this.accountService.currentUser.subscribe(data => {
        this.currentUser = data;
      })
      this.accountService.isLoggedIn.subscribe(data => {
        this.isLoggedIn = data;
      })
    })
  }

  changeGenre(genre:GenreModel){
    this.headerService.updateSelectedGenre(genre);
  }

  Logout() {
    this.accountService.Logout();
    this._router.navigateByUrl('/');
  }

}
