import {Component, Inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CinemaType } from 'src/app/models/cinemaType';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Cinema} from "../../../models/cinema";
import {Producer} from "../../../models/producer";
import {FileHandle} from "../../../models/file-handle.model";
import {CinemaTypeService} from "../../../services/cinema-type.service";
import {AddOrEditCinemaData} from "../../cinema/add-or-edit-cinema/add-or-edit-cinema.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {formatMoment} from "ngx-bootstrap/chronos/format";

export class AddOrEditCinemaTypeData {
  constructor(
    public cinemaType: CinemaType) {
  }
}

@Component({
  selector: 'app-add-or-edit-cinema-type',
  templateUrl: './add-or-edit-cinema-type.component.html',
  styleUrls: ['./add-or-edit-cinema-type.component.css']
})
export class AddOrEditCinemaTypeComponent implements OnInit {

  title: string = "Thêm mới loại phim";
  action: string = "Thêm mới";
  cinemaType: CinemaType = {
    status: 0,
    name: '',
    description: '',
    createTime: '',
    updateTime: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddOrEditCinemaTypeComponent>,
    private cinemaTypeService: CinemaTypeService,
    @Inject(MAT_DIALOG_DATA) public cinemaTypeData: AddOrEditCinemaTypeData) { }

  ngOnInit(): void {
    if (this.cinemaTypeData) {
      this.action = "Cập nhật"
      this.title = "Cập nhật loại phim"
      this.cinemaType = this.cinemaTypeData.cinemaType;
    }
  }

  createOrUpdateCinemaType(cinemaType: CinemaType, form: NgForm) {
    if (!this.cinemaTypeData) {
      this.createCinemaType(cinemaType, form);
    } else {
      this.updateCinemaType(cinemaType, form);
    }
    console.log(this.cinemaType)
  }

  close() {
    this.dialogRef.close();
  }

  private createCinemaType(cinemaType: CinemaType, form: NgForm) {
    this.cinemaTypeService.createCinemaType(cinemaType).subscribe(
      (response) => {
        form.reset();
        this.dialogRef.close('save')
        console.log("create-cinema-type",response)
      },
      (error) => {
        alert('Thêm mới loại phim thất bại');
        console.log(error)
      }
    )
  }

  private updateCinemaType(cinemaType: CinemaType, form: NgForm) {
    this.cinemaTypeService.updateCinemaType(cinemaType, cinemaType.id).subscribe(
      (response) => {
        form.reset();
        this.dialogRef.close('update')
        console.log("create-cinema-type",response)
      },
      (error) => {
        alert('Cập nhật loại phim thất bại');
        console.log(error)
      }
    )
  }
}
