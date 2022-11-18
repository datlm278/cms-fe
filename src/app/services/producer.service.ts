import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CinemaType} from "../models/cinemaType";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Producer} from "../models/producer";

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  private host = environment.APIUrl;
  private rest = environment.rest;

  constructor(private http: HttpClient) { }

  public getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${this.host}/${this.rest}/producer/find-all`);
  }
}
