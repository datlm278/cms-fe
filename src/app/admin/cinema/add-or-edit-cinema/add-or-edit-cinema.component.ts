import {Component, Inject, OnInit} from '@angular/core';
import {Cinema} from "../../../models/cinema";
import {Producer} from "../../../models/producer";
import {CinemaType} from "../../../models/cinemaType";
import {HttpErrorResponse} from "@angular/common/http";
import {ProducerService} from "../../../services/producer.service";
import {CinemaTypeService} from "../../../services/cinema-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {FileHandle} from "../../../models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {CinemaService} from "../../../services/cinema.service";
import {ImageService} from "../../../services/image.service";
import {DatePipe, formatDate} from "@angular/common";


export class AddOrEditCinemaData {
  constructor(
    public cinema: Cinema,
    public producers: Producer[],
    public cinemaTypes: CinemaType[],
    public images: FileHandle[]) {
  }
}

@Component({
  selector: 'app-add-or-edit-cinema',
  templateUrl: './add-or-edit-cinema.component.html',
  styleUrls: ['./add-or-edit-cinema.component.css']
})

export class AddOrEditCinemaComponent implements OnInit {

  title: String = "Thêm mới phim";
  action: String = 'Thêm mới';
  producers: Producer[] = [];
  cinemaTypes: CinemaType[] = [];
  cinema: Cinema = {
    images: [],
    cinemaType: '',
    createTime: '',
    director: '',
    name: '',
    producerName: '',
    releaseDate: '',
    updateTime: ''
  };
  images: FileHandle[] | undefined;


  constructor(private producerService: ProducerService,
              private cinemaTypeService: CinemaTypeService,
              private matDialogRef: MatDialogRef<AddOrEditCinemaData>,
              private cinemaService: CinemaService,
              private sanitizer: DomSanitizer,
              private imageService: ImageService,
              @Inject(MAT_DIALOG_DATA) public updateCinemaData: AddOrEditCinemaData) {

  }

  ngOnInit(): void {
    this.getProducers();
    this.getCinemaTypes();
    if (this.updateCinemaData) {
      this.action = 'Cập nhật'
      this.title = 'Cập nhật phim'
      this.producers = this.updateCinemaData.producers;
      this.cinemaTypes = this.updateCinemaData.cinemaTypes;
      this.cinema = this.updateCinemaData.cinema;
      this.images = <FileHandle[]><unknown>this.imageService.getImages(this.cinema);
      // this.cinema.releaseDate = this.updateCinemaData.releaseDate;
    }
  }

  private getCinemaTypes(): void {
    this.cinemaTypeService.getAllCinemaType().subscribe(
      (response) => {
        this.cinemaTypes = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  private getProducers(): void {
    this.producerService.getAllProducers().subscribe(
      (response) => {
        this.producers = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  createOrUpdateCinema(form: NgForm) {
    if (!this.updateCinemaData) {
      this.createCinema(form);
    } else {
      this.updateCinema(form);
    }
  }

  private updateCinema(form: NgForm) {
    const cinemaData = this.prepareFormData(this.cinema);
    this.cinemaService.updateCinema(cinemaData, this.updateCinemaData.cinema.id)
      .subscribe({
        next:(res)=>{
          form.reset()
          this.matDialogRef.close('update')
        },
        error:()=>{
          alert("Cập nhật phim thất bại")
        }
      })
  }

  private createCinema(form: NgForm) {
    const cinemaData = this.prepareFormData(this.cinema);
    this.cinemaService.createCinema(cinemaData).subscribe(
      (response) => {
        form.reset();
        this.matDialogRef.close('save');
      },
      (error) => {
        alert("Thêm mới phim thất bại")
      }
    )
  }

  prepareFormData(cinema: Cinema): FormData {
    const formData = new FormData();
    formData.append(
      'cinema',
      new Blob([JSON.stringify(cinema)], {type: 'application/json'})
    );

    for (let i = 0; i< cinema.images.length; i++) {
      formData.append(
        'images',
        cinema.images[i].file,
        cinema.images[i].file.name
      );
    }
    return formData;
  }

  onSelectedFile(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.cinema.images.push(fileHandle);
    }
  }

  close(): void {
    this.matDialogRef.close();
  }

  onRemoveImages(i: number) {
    this.cinema.images.splice(i, 1)
  }
}
