import {Component, OnInit} from '@angular/core';
import {Cinema} from 'src/app/models/cinema';
import {CinemaService} from '../../services/cinema.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddOrEditCinemaComponent, AddOrEditCinemaData} from "./add-or-edit-cinema/add-or-edit-cinema.component";
import {ImagesDialogComponent} from "./images-dialog/images-dialog.component";
import {map} from "rxjs";
import {ImageService} from "../../services/image.service";
import {ConfirmDialogModel, DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {ProducerService} from "../../services/producer.service";
import {CinemaTypeService} from "../../services/cinema-type.service";
import {Producer} from "../../models/producer";
import {CinemaType} from "../../models/cinemaType";
import {formatDate} from "@angular/common";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
})
export class CinemaComponent implements OnInit {

  cinemas: Cinema[] = [];
  private selectedValue: number | undefined = -1;
  private cinema: Cinema = {
    cinemaType: "",
    cinemaTypeId: 0,
    createTime: "",
    director: "",
    images: [],
    name: "",
    producerId: 0,
    producerName: "",
    releaseDate: "",
    updateTime: ""
  };
  private producers: Producer[] = [];
  private cinemaTypes: CinemaType[] = [];

  constructor(
    private cinemaService: CinemaService,
    public dialog: MatDialog,
    private imageService: ImageService,
    private producerService: ProducerService,
    private cinemaTypeService: CinemaTypeService,
  ) {
  }

  ngOnInit(): void {
    this.getCinemas();
  }

  private getCinemas(): void {
    this.cinemaService.getAll()
      .pipe(
        map((x: Cinema[], i) => x.map((cinema: Cinema) => this.imageService.getImages(cinema)))
      )
      .subscribe(
        (response: Cinema[]) => {
          this.cinemas = response;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  openCreateDialog() {
    this.dialog.open(AddOrEditCinemaComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getCinemas();
      }
    })
  }

  openUpdateDialog(id: number | undefined) {
    this.cinemaService.getCinemaById(id).subscribe((res) => {
      this.cinema = res;
      console.log("getCinemaById", res)
      this.producerService.getAllProducers().subscribe((res) => {
        this.producers = res
        console.log("data-producers", this.producers)
        this.cinemaTypeService.getAllCinemaType().subscribe((res) => {
          this.cinemaTypes = res
          console.log("data-cinemaTypes", this.producers)
          setTimeout(() => {
            // const date = new Date(this.cinema.releaseDate);
            // let releaseDate = formatDate(date, 'MM/dd/yyyy', 'en-US')
            // console.log(releaseDate)
            const dialogData = new AddOrEditCinemaData(this.cinema, this.producers, this.cinemaTypes, this.cinema.images)
            this.dialog.open(
              AddOrEditCinemaComponent,
              {
                width: "30%",
                data: dialogData
              }).afterClosed().subscribe(value => {
                if (value === 'update') {
                  this.getCinemas();
                }
            })
          });
        })
      })
    })
  }

  deleteCinema() {
    this.cinemaService.deleteCinema(this.selectedValue)
      .subscribe(
        (response) => {
          console.log(response);
          this.getCinemas();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
  }

  openImageDialog(cinema: Cinema) {
    console.log(cinema)
    this.dialog.open(ImagesDialogComponent, {
      data: {
        images: cinema.images
      },
      height: '500px',
      width: '800px'
    })
  }

  openDeleteDialog(id: number | undefined) {
    this.selectedValue = id;
    const message = `Bạn có chắc chắn muốn xoá phim đã chọn?`;

    const dialogData = new ConfirmDialogModel("Xác nhận xoá", message);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.deleteCinema();
      } else {
        this.getCinemas();
      }
    });
  }
}
