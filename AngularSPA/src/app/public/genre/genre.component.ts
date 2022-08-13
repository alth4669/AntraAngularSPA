import { Component, OnChanges, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import { GenrePageModel } from 'src/app/shared/models/GenrePageModel';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genreId!:number;
  pagedGenreSet!:GenrePageModel;
  prevDisabled!:string;
  nextDisabled!:string;
  pages!:number[];


  constructor(private movieService:MoviesService, private route:ActivatedRoute, private headerService:HeaderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreId = params["genreId"];
      this.getMovies(this.genreId);
    });
    this.headerService.currentSelectedGenre.subscribe(g => {
        this.genreId = g.id;
        console.log(g);
        this.getMovies(g.id);
    });
    
  }
  
  isActive(i:number):string {
    return (i == this.pagedGenreSet.pageIndex) ? "active" : "";
  }

  getMovies(Id:number){
    this.movieService.getMoviesByGenre(Id).subscribe(m => {
      this.pagedGenreSet = m;
      this.prevDisabled = !this.pagedGenreSet.hasPreviousPage ? "disabled" : "";
      this.nextDisabled = !this.pagedGenreSet.hasNextPage ? "disabled" : "";
      console.log(m);
      this.pages = Array(this.pagedGenreSet.totalPages).fill(1).map((x,i) => i+1 );
    });
  }

  getNextPage(page:number){
    this.movieService.getMoviesByGenre(this.genreId, page).subscribe(m => {
      this.pagedGenreSet = m;
      console.log(m);
      this.prevDisabled = !this.pagedGenreSet.hasPreviousPage ? "disabled" : "";
      this.nextDisabled = !this.pagedGenreSet.hasNextPage ? "disabled" : "";
    });
  }

}
