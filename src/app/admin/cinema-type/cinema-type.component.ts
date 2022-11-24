import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CinemaType} from 'src/app/models/cinemaType';
import {CinemaTypeService} from 'src/app/services/cinema-type.service';
import {
  AddOrEditCinemaTypeComponent,
  AddOrEditCinemaTypeData
} from './add-or-edit-cinema-type/add-or-edit-cinema-type.component';
import {ConfirmDialogModel, DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {AddOrEditCinemaComponent, AddOrEditCinemaData} from "../cinema/add-or-edit-cinema/add-or-edit-cinema.component";

@Component({
  selector: 'app-cinema-type',
  templateUrl: './cinema-type.component.html',
  styleUrls: ['./cinema-type.component.css']
})
export class CinemaTypeComponent implements OnInit {

  cinemaTypes: CinemaType[] = [];
  private selectedValue: number | undefined = -1;
  cinemaType: CinemaType = {
    createTime: "",
    description: "",
    name: "",
    status: 0,
    updateTime: ""
  };

  constructor(
    private cinemaTypeService: CinemaTypeService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getCinemaTypes()
  }

  private getCinemaTypes(): void {
    this.cinemaTypeService.getAllCinemaType()
      .subscribe(
        (response: CinemaType[]) => {
          this.cinemaTypes = response;
          console.log(response)
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        })
  }

  openCreateDialog() {
    this.dialog.open(AddOrEditCinemaTypeComponent, {
      width: '30%',
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getCinemaTypes();
      }
    })

  }

  openUpdateDialog(id: number | undefined) {
    this.cinemaTypeService.getCinemaTypeById(id)
      .subscribe(
        (response) => {
          this.cinemaType = response;
          console.log("getCinemaTypeById", response)
          setTimeout(() => {
            // const date = new Date(this.cinema.releaseDate);
            // let releaseDate = formatDate(date, 'MM/dd/yyyy', 'en-US')
            // console.log(releaseDate)
            const dialogData = new AddOrEditCinemaTypeData(this.cinemaType)
            this.dialog.open(AddOrEditCinemaTypeComponent,
              {
                width: "30%",
                data: dialogData
              }).afterClosed().subscribe(value => {
              if (value === 'update') {
                this.getCinemaTypes();
              }
            })
          });
        })
  }

  openDeleteDialog(id: number | undefined) {
    this.selectedValue = id;
    console.log(this.selectedValue)
    const message = `Bạn có chắc chắn muốn xoá phim đã chọn?`;

    const dialogData = new ConfirmDialogModel("Xác nhận xoá", message);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.cinemaTypeService.deleteCinemaType(this.selectedValue)
          .subscribe(
            (response) => {
              console.log(response);
              this.getCinemaTypes();
            },
            (error: HttpErrorResponse) => {
              alert(error.message)
            }
          )
      } else {
        this.getCinemaTypes();
      }
    });
  }

}
