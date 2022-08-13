import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewModel } from 'src/app/shared/models/ReviewModel';
import { FavoriteRequestModel } from 'src/app/shared/models/FavoriteRequestModel';
import { PurchaseRequestModel } from 'src/app/shared/models/PurchaseRequestModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  checkMovieFavorite(movieId:number):Observable<boolean> {
    return this.http.get<boolean>("https://localhost:7174/api/User/check-movie-favorite/"+movieId);
  }
  getReviewDetails(movieId:number):Observable<ReviewModel> {
    return this.http.get<ReviewModel>("https://localhost:7174/api/User/review-details/"+movieId);
  }
  checkMoviePurchased(movieId:number):Observable<boolean> {
    return this.http.get<boolean>("https://localhost:7174/api/User/check-movie-purchased/"+movieId);
  }
  favoriteMovie(favorite:FavoriteRequestModel):Observable<boolean> {
    return this.http.post<boolean>("https://localhost:7174/api/User/favorite", favorite);
  }
  unFavoriteMovie(favorite:FavoriteRequestModel):Observable<boolean> {
    return this.http.post<boolean>("https://localhost:7174/api/User/un-favorite", favorite);
  }
  purchaseMovie(purchase:PurchaseRequestModel, userId:number):Observable<boolean> {
    return this.http.post<boolean>("https://localhost:7174/api/User/purchase-movie?userId="+userId, purchase,);
  }
  reviewMovie(review:ReviewModel):Observable<boolean> {
    return this.http.post<boolean>("https://localhost:7174/api/User/add-review", review);
  }
  updateReview(review:ReviewModel):Observable<ReviewModel> {
    return this.http.put<ReviewModel>("https://localhost:7174/api/User/edit-review", review);
  }
  deleteReview(movieId:number):Observable<boolean> {
    return this.http.delete<boolean>("https://localhost:7174/api/User/delete-review/"+movieId);
  }
  getAllFavorites():Observable<FavoriteRequestModel[]> {
    return this.http.get<FavoriteRequestModel[]>("https://localhost:7174/api/User/favorites");
  }
  getAllPurchases(userId:number):Observable<PurchaseRequestModel[]> {
    return this.http.get<PurchaseRequestModel[]>("https://localhost:7174/api/User/Purchases/"+userId);
  }
  getPurchaseDetails(movieId:number):Observable<PurchaseRequestModel> {
    return this.http.get<PurchaseRequestModel>("https://localhost:7174/api/User/purchase-details/"+movieId);
  }
}
