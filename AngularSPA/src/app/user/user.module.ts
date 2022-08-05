import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import { FavoritesComponent } from './favorites.component';
import { PurchasesComponent } from './purchases.component';
import { ReviewsComponent } from './reviews.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    FavoritesComponent,
    PurchasesComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
