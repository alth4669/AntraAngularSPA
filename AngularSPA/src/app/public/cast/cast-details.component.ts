import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CastService } from 'src/app/core/services/cast.service';
import { CastDetailsModel } from 'src/app/shared/models/CastDetailsModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {

  castDetails!:CastDetailsModel;
  castId!:number;

  constructor(private castService:CastService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.castId = params["castId"];
    });
    this.castService.getCastDetails(this.castId).subscribe(c => {
      this.castDetails = c;
      console.log(c);
    });
  }

}
