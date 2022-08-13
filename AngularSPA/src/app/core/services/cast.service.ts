import { Injectable } from '@angular/core';
import { CastDetailsModel} from 'src/app/shared/models/CastDetailsModel';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private http:HttpClient) { }

  getCastDetails(castId:number):Observable<CastDetailsModel> {
    return this.http.get<CastDetailsModel>("https://localhost:7174/api/Cast/" + castId);
  }
}
