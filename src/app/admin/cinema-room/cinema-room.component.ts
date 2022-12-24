import {Component, OnInit} from '@angular/core';
import {CinemaRoom} from "../../models/cinema-room.model";
import {CinemaRoomService} from "../../services/cinema-room.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {AddCinemaRoomComponent} from "./add-cinema-room/add-cinema-room.component";

@Component({
  selector: 'app-cinema-room',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css']
})
export class CinemaRoomComponent implements OnInit {

  cinemaRooms: CinemaRoom[] = []
  private selectedValue: number | undefined = -1;
  cinemaRoom: CinemaRoom = {
    createTime: "",
    id: 0,
    roomCode: "",
    screenType: "",
    status: 0,
    totalSeats: 0,
    updateTime: ""
  }

  constructor(
    private cinemaRoomService: CinemaRoomService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCinemaRooms()
  }

  private getCinemaRooms(): void {
    this.cinemaRoomService.getAllCinemaRoom()
      .subscribe(
        (response: CinemaRoom[]) => {
          this.cinemaRooms = response;
          console.log(response)
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        })
  }

  openCreateDialog() {
    this.dialog.open(AddCinemaRoomComponent, {
      width: '30%',
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getCinemaRooms();
      }
    })
  }

  openUpdateDialog(id: number) {

  }

  openDeleteDialog(id: number) {

  }
}
