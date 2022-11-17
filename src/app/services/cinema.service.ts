import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
import {Cinema} from "../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private host = environment.APIUrl;
  private rest = environment.rest;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.host}/${this.rest}/cinema/find-all`);
  }

  public createCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(`${this.host}/${this.rest}/cinema/create`, cinema);
  }

  public deleteCinema(cinemaId: number | undefined) {
    return this.http.post(`${this.host}/${this.rest}/cinema/delete?id=${cinemaId}`, null, {responseType: "text"});
  }
}
