import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CinemaRoom} from "../models/cinema-room.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SeatRoom} from "../models/seat-room.model";

@Injectable({
  providedIn: 'root'
})
export class SeatRoomService {

  private host = environment.APIUrl;
  private rest = environment.rest;

  constructor(private http: HttpClient) { }


  public getAllSeatRooms(): Observable<SeatRoom[]> {
    return this.http.get<SeatRoom[]>(`${this.host}/${this.rest}/seat-room/find-all`);
  }
}
