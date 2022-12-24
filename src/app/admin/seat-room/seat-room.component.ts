import {Component, OnInit} from '@angular/core';
import {SeatRoom} from "../../models/seat-room.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {SeatRoomService} from "../../services/seat-room.service";

@Component({
  selector: 'app-seat-room',
  templateUrl: './seat-room.component.html',
  styleUrls: ['./seat-room.component.css']
})
export class SeatRoomComponent implements OnInit {

  seatRooms: SeatRoom[] = []
  private selectValue: number | undefined = -1
  seatRoom: SeatRoom = {
    roomCode: "",
    createTime: "",
    id: 0,
    rowName: "",
    seatNumber: 0,
    seatPosition: "",
    status: 0,
    updateTime: ""
  }

  constructor(
    private seatRoomService: SeatRoomService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSeatRooms();
  }

  private getSeatRooms(): void {
    this.seatRoomService.getAllSeatRooms()
      .subscribe(
        (response: SeatRoom[]) => {
          this.seatRooms = response;
          console.log(response)
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        })
  }


  openCreateDialog() {

  }

  openUpdateDialog(id: number) {

  }

  openDeleteDialog(id: number) {

  }
}
