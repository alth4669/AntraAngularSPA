import { Injectable } from '@angular/core';
import { MovieCardModel} from 'src/app/shared/models/MovieCardModel';
import { MovieDetailsModel } from 'src/app/shared/models/MovieDetailsModel';
import { GenrePageModel } from 'src/app/shared/models/GenrePageModel';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  getTopGrossingMovies():Observable<MovieCardModel[]> {
    return this.http.get<MovieCardModel[]>("https://localhost:7174/api/Movies/top-grossing");
  }

  getMovieDetails(movieId:number):Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>("https://localhost:7174/api/Movies/" + movieId);
  }

  getMoviesByGenre(genreId:number, page:number=1, pageSize:number=30):Observable<GenrePageModel> {
    return this.http.get<GenrePageModel>("https://localhost:7174/api/Movies/Genre/" + genreId
    + "?page=" + page + "&pageSize=" + pageSize);
  }
}
