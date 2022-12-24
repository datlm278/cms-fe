import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CinemaRoom} from "../models/cinema-room.model";
import {CinemaType} from "../models/cinemaType";
import {CinemaSeatRoomRequest} from "../models/request/cinema-seat-room-request";

@Injectable({
  providedIn: 'root'
})
export class CinemaRoomService {

  private host = environment.APIUrl;
  private rest = environment.rest;

  constructor(private http: HttpClient) { }

  public getAllCinemaRoom(): Observable<CinemaRoom[]> {
    return this.http.get<CinemaRoom[]>(`${this.host}/${this.rest}/cinema-room/find-all`);
  }

  public createCinemaRoomAndSeatRoom(cinemaSeatRoom: CinemaSeatRoomRequest){
    return this.http.post(`${this.host}/${this.rest}/cinema-room/create-room-and-seat-room`, cinemaSeatRoom, {
      responseType: "text"
    });
  }
}
