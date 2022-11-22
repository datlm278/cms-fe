import {Component, OnInit} from '@angular/core';
import {Cinema} from "../../../models/cinema";
import {Producer} from "../../../models/producer";
import {CinemaType} from "../../../models/cinemaType";
import {HttpErrorResponse} from "@angular/common/http";
import {ProducerService} from "../../../services/producer.service";
import {CinemaTypeService} from "../../../services/cinema-type.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {FileHandle} from "../../../models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {CinemaService} from "../../../services/cinema.service";

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
    cinemaImage: [],
    cinemaTypeId: 0,
    producerId: 0,
    cinemaType: '',
    createTime: '',
    director: '',
    name: '',
    producerName: '',
    releaseDate: '',
    updateTime: ''
  };


  constructor(private producerService: ProducerService,
              private cinemaTypeService: CinemaTypeService,
              private matDialogRef: MatDialogRef<AddOrEditCinemaComponent>,
              private cinemaService: CinemaService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getProducers();
    this.getCinemaTypes();
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

  createCinema(form: NgForm) {

    const cinemaData = this.prepareFormData(this.cinema);

    this.cinemaService.createCinema(cinemaData).subscribe(
      (response) => {
        form.reset();
        this.matDialogRef.close('save');
      },
      (error) => {
        alert("Error while creating employee!")
        console.log(error.message());
      }
    )
  }

  prepareFormData(cinema: Cinema): FormData {
    const formData = new FormData();
    formData.append(
      'cinema',
      new Blob([JSON.stringify(cinema)], {type: 'application/json'})
    );

    for (let i = 0; i< cinema.cinemaImage.length; i++) {
      formData.append(
        'poster',
        cinema.cinemaImage[i].file,
        cinema.cinemaImage[i].file.name
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

      this.cinema.cinemaImage.push(fileHandle);
    }
  }
}
