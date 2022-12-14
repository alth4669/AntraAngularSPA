import { Injectable } from '@angular/core';
import { GenreModel } from 'src/app/shared/models/GenreModel';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient) { }

  getAllGenres():Observable<GenreModel[]> {
    return this.http.get<GenreModel[]>("https://localhost:7174/api/Genres");
  }
}
