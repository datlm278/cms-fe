import {Component, Inject, OnInit} from '@angular/core';
import {CinemaRoom} from "../../../models/cinema-room.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CinemaTypeService} from "../../../services/cinema-type.service";
import {AddOrEditCinemaTypeData} from "../../cinema-type/add-or-edit-cinema-type/add-or-edit-cinema-type.component";
import {CinemaRoomService} from "../../../services/cinema-room.service";
import {NgForm} from "@angular/forms";
import {CinemaSeatRoomRequest} from "../../../models/request/cinema-seat-room-request";

export class AddOrEditCinemaRoomData {
  constructor(
    public cinemaRoom: CinemaRoom) {
  }
}

@Component({
  selector: 'app-add-cinema-room',
  templateUrl: './add-cinema-room.component.html',
  styleUrls: ['./add-cinema-room.component.css']
})
export class AddCinemaRoomComponent implements OnInit {

  // cinemaRoom: CinemaRoom = {
  //   id: 0,
  //   roomCode: "",
  //   screenType: "",
  //   totalSeats: 0,
  //   status: 0,
  //   createTime: '',
  //   updateTime: ''
  // };

  cinemaSeatRoom: CinemaSeatRoomRequest = {
    createTime: "",
    roomCode: "",
    rowName: "",
    screenType: "",
    seatNumber: 0,
    status: 0,
    totalSeats: 0

  }

  constructor(
    private dialogRef: MatDialogRef<AddCinemaRoomComponent>,
    private cinemaRoomService: CinemaRoomService,
    @Inject(MAT_DIALOG_DATA) public cinemaTypeData: AddOrEditCinemaTypeData) { }

  ngOnInit(): void {
  }

  createCinemaRoomAndSeatRoom(cinemaSeatRoom: CinemaSeatRoomRequest, form: NgForm) {
    this.cinemaRoomService.createCinemaRoomAndSeatRoom(cinemaSeatRoom).subscribe(
      (response) => {
        form.reset();
        this.dialogRef.close('save')
        console.log("create",response)
      },
      (error) => {
        alert('Tạo phòng chiếu và ghế phòng thất bại');
        console.log(error)
      }
    )
  }

  close() {
    this.dialogRef.close();
  }
}
