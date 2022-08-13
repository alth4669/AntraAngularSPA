import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateCastComponent } from './create-cast.component';
import { CreateMovieComponent } from './create-movie.component';
import { TopPurchasesComponent } from './top-purchases.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateCastComponent,
    CreateMovieComponent,
    TopPurchasesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
