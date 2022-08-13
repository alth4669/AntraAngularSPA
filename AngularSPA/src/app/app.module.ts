import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CastDetailsComponent } from './public/cast/cast-details.component';
import { GenreComponent } from './public/genre/genre.component';
import { MovieComponent } from './public/movie/movie.component';
import { MovieDetailsComponent } from './public/movie/movie-details.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtAdderInterceptor } from './core/Interceptors/jwt-adder.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CastDetailsComponent,
    GenreComponent,
    MovieComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAdderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }
 }
