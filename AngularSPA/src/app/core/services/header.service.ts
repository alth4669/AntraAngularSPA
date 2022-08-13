import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GenreModel } from 'src/app/shared/models/GenreModel';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private selectedGenre = new Subject<GenreModel>();
  currentSelectedGenre = this.selectedGenre.asObservable();

  constructor() { }

  updateSelectedGenre(genre:GenreModel){
    this.selectedGenre.next(genre);
  }
}
