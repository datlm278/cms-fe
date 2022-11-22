import {Component, OnInit} from '@angular/core';
import {Cinema} from 'src/app/models/cinema';
import {CinemaService} from '../../services/cinema.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditCinemaComponent} from "./add-or-edit-cinema/add-or-edit-cinema.component";
import {ImagesDialogComponent} from "./images-dialog/images-dialog.component";
import {map} from "rxjs";
import {ImageService} from "../../services/image.service";
import {ConfirmDialogModel, DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {ProducerService} from "../../services/producer.service";
import {CinemaTypeService} from "../../services/cinema-type.service";
import {Producer} from "../../models/producer";

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
  private data: Cinema | undefined;
  private producer: Producer[] = [];

  constructor(
    private cinemaService: CinemaService,
    public dialog: MatDialog,
    private imageService: ImageService,
    private producerService: ProducerService,
    private cinemaTypeService: CinemaTypeService
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
      console.log("getCinemaById", res)
      this.data = res;
      this.producerService.getAllProducers().subscribe((res) => {
        this.producer = res
        setTimeout(() => {
          const updateCinemaDialog = this.dialog.open(
            AddOrEditCinemaComponent,
            {
              data: {
                cinema: this.data,
                producer: this.producer
              },
              disableClose: true,
            }
          );

          updateCinemaDialog.afterClosed().subscribe((data) => {
            if (!data) return
            this.data = data
            this.cinemaService.updateCinema(this.prepareFormData(<Cinema>this.data), this.data?.id)
              .subscribe
              ((res) => {
                  console.log(res)
                  this.getCinemas();
                },
                error => {
                  console.log(error)
              })
          })
        });
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

  getCinemaById(id: number | undefined): Cinema {
    this.cinemaService.getCinemaById(id).subscribe({
      next: (data) => {
        this.cinema = data
        return data;
      },
      error: (err) => {
        console.log(err)
      }
    });
    return this.cinema;
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
      maxWidth: "400px",
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

  prepareFormData(cinema: Cinema): FormData {
    const formData = new FormData();
    formData.append(
      'cinema',
      new Blob([JSON.stringify(cinema)], {type: 'application/json'})
    );

    for (let i = 0; i < cinema.images.length; i++) {
      formData.append(
        'poster',
        cinema.images[i].file,
        cinema.images[i].file.name
      );
    }
    return formData;
  }
}
