import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CinemaType} from "../models/cinemaType";
import {Cinema} from "../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaTypeService {

  private host = environment.APIUrl;
  private rest = environment.rest;

  constructor(private http: HttpClient) { }

  public getAllCinemaType(): Observable<CinemaType[]> {
    return this.http.get<CinemaType[]>(`${this.host}/${this.rest}/cinema-type/find-all`);
  }

  public createCinemaType(cinemaType: CinemaType){
    return this.http.post(`${this.host}/${this.rest}/cinema-type/create`, cinemaType, {
      responseType: "text"
    });
  }

}
