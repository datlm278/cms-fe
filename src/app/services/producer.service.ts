import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CinemaType} from "../models/cinemaType";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Producer} from "../models/producer";
import {Cinema} from "../models/cinema";

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

  public createProducer(formData: FormData){
    return this.http.post(`${this.host}/${this.rest}/producer/create`, formData, {
      responseType: "text"
    });
  }

  public deleteProducer(id: number | undefined) {
    return this.http.post(`${this.host}/${this.rest}/producer/delete?id=${id}`, null, {
      responseType: "text"});
  }

  public getProducerById(id: number | undefined): Observable<Producer> {
    return this.http.get<Producer>(`${this.host}/${this.rest}/producer/find-by-id?id=${id}`);
  }

  public updateProducer(formData: FormData, id: number | undefined){
    return this.http.post(`${this.host}/${this.rest}/producer/update?id=${id}`, formData, {
      responseType: "text"
    });
  }
}
