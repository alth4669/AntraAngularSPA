import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsModel } from 'src/app/shared/models/MovieDetailsModel';
import { ActivatedRoute } from '@angular/router';
import { ActiveUserModel } from 'src/app/shared/models/ActiveUserModel';
import { AccountService } from 'src/app/core/services/account.service';
import { UserService } from 'src/app/core/services/user.service';
import { ReviewModel } from 'src/app/shared/models/ReviewModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { PurchaseRequestModel } from 'src/app/shared/models/PurchaseRequestModel';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';
import { FavoriteRequestModel } from 'src/app/shared/models/FavoriteRequestModel';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  details!: MovieDetailsModel;
  movieId!: number;
  currentUser!: ActiveUserModel;
  isLoggedIn: boolean = false;
  isFavorite: boolean = false;
  review: ReviewModel = {movieId:-1, userId:-1, rating:-1, reviewText:""};
  isPurchased: boolean = false;
  possibleRatings: number[] = [1,2,3,4,5,6,7,8,9];


  constructor(private movieService:MoviesService, private route:ActivatedRoute, private accountService:AccountService,
    private userService:UserService, private modalService:NgbModal, private _router:Router) { }

  openModal(content:any, modalTitle:string) {
    this.modalService.open(content, {ariaLabelledBy: modalTitle});
  }

  selectedStatus(i:number) {
    return this.review.rating==i ? "selected" : "";
  }

  submitReview(reviewForm:NgForm) {
    if (this.review.userId == -1) {
      const newReview:ReviewModel = {movieId: this.details.id, userId: Number(this.currentUser.nameid),
        rating: reviewForm.value.Rating, reviewText: reviewForm.value.ReviewText};
      console.log(newReview);
      this.userService.reviewMovie(newReview).subscribe(data => {
        if (data) {
          this.review = newReview;
          alert("Review submitted! Thanks for your feedback!");
          this.modalService.dismissAll();
        }
      });
    }
    else {
      this.review.rating = reviewForm.value.rating;
      this.review.reviewText = reviewForm.value.reviewText;
      this.userService.updateReview(this.review).subscribe(data => {
        if (data) {
          alert("Review updated! Thanks for your feedback!");
          this.modalService.dismissAll();
        }
      });
    }
  }

  deleteReview() {
    this.userService.deleteReview(this.details.id).subscribe(data => {
      if (data) {
        this.review = {movieId:-1, userId:-1, rating:-1, reviewText:""};
        alert("Review has been removed");
        this.modalService.dismissAll();
      }
    })
  }



  purchaseMovie() {
    const purchase: PurchaseRequestModel = {purchaseNumber: String(Guid.create()), totalPrice: this.details.price,
      purchaseDateTime: (new Date()).toISOString(), movieId: this.details.id, posterUrl: ""};
    console.log(purchase);
    this.userService.purchaseMovie(purchase, Number(this.currentUser.nameid)).subscribe(data => {
      if (data) {
        alert(this.details.title + " has been purchased. Enjoy!");
        this.modalService.dismissAll();
        location.reload();
      }
    })
  }

  favoriteMovie() {
    const favorite: FavoriteRequestModel = {movieId: this.details.id, userId: Number(this.currentUser.nameid), posterUrl: ""};
    this.userService.favoriteMovie(favorite).subscribe(data => {
      if (data) {
        alert(this.details.title + " has been added to your favorites!");
        this.isFavorite = true;
        location.reload();
      }
    })
  }

  unFavoriteMovie() {
    const favorite: FavoriteRequestModel = {movieId: this.details.id, userId: Number(this.currentUser.nameid), posterUrl: ""};
    this.userService.unFavoriteMovie(favorite).subscribe(data => {
      if (data) {
        alert(this.details.title + " has been removed from your favorites");
        this.isFavorite = false;
        location.reload();
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params["movieId"];
    });
    this.movieService.getMovieDetails(this.movieId).subscribe(m => {
      this.details = m;
      console.log(m);
      this.accountService.currentUser.subscribe(data => {
        this.currentUser = data;
      });
      this.accountService.isLoggedIn.subscribe(data => {
        this.isLoggedIn = data;
      });
      if (this.isLoggedIn) {
        this.userService.checkMovieFavorite(this.details.id).subscribe(data => {
          this.isFavorite = data;
          console.log("isFavorite: " + this.isFavorite);
        });
        this.userService.getReviewDetails(this.details.id).subscribe(data => {
          if (data) {
            this.review = data;
            console.log(this.review);
          }
        })
        this.userService.checkMoviePurchased(this.details.id).subscribe(data => {
          this.isPurchased = data;
          console.log("isPurchased: " + this.isPurchased);
        })
      };
    })
  }
}
