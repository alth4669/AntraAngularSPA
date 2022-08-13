import { Component, OnInit } from '@angular/core';
import { FavoriteRequestModel } from '../shared/models/FavoriteRequestModel';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites!: FavoriteRequestModel[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllFavorites().subscribe(data => {
      if (data) {
        this.favorites = data;
      }
    })
  }

}
