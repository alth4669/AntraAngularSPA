import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieCardModel } from 'src/app/shared/models/MovieCardModel';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies!:MovieCardModel[];
  constructor(private movieService:MoviesService) { }

  ngOnInit(): void {
    this.movieService.getTopGrossingMovies().subscribe(m => {
      this.movies = m;
      console.log(m);
    });
  }

}
