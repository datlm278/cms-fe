import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { CinemaService } from '../../services/cinema.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms';
import {ProducerService} from "../../services/producer.service";
import {CinemaTypeService} from "../../services/cinema-type.service";
import {CinemaType} from "../../models/cinemaType";
import {Producer} from "../../models/producer";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
})
export class CinemaComponent implements OnInit {
  cinemas: Cinema[] = [];
  producers: Producer[] = [];
  cinemaTypes: CinemaType[] = [];

  cinema: Cinema = {
    cinemaTypeId: 0,
    producerId: 0,
    poster: "",
    posterName: "",
    cinemaType: '',
    createTime: '',
    director: '',
    name: '',
    producerName: '',
    releaseDate: '',
    updateTime: ''
  };

  cinemaUpdate: Cinema = {
    cinemaTypeId: 0,
    producerId: 0,
    poster: "",
    posterName: "",
    cinemaType: '',
    createTime: '',
    director: '',
    name: '',
    producerName: '',
    releaseDate: '',
    updateTime: ''
  };

  private selectedValue: number | undefined = -1;
  private deleteModal: any;
  public cinemaFile: string | Blob = '';
  url: string = '';

  constructor(
    private cinemaService: CinemaService,
    private producerService: ProducerService,
    private cinemaTypeService: CinemaTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCinemas();
    this.getProducers();
    this.getCinemaTypes();
  }

  private getCinemas(): void {
    this.cinemaService.getAll().subscribe(
      (response: Cinema[]) => {
        this.cinemas = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
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

  onSelectedFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      this.cinemaFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      console.log(this.cinemaTypes);
    }

  }

  onSubmit(data: Cinema, form: NgForm) {
    this.cinemaService.insertCinema(data, this.cinemaFile).subscribe({
          next: (value) => {
            this.getCinemas();
            form.control.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Thêm mới phim',
              detail: 'Thêm phim thành công'
            })
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thêm mới phim',
              detail: 'Thêm phim thất bại'
            })
          }
        })
        console.log(data);
  }

  onDelete() {
    this.cinemaService.deleteCinema(this.selectedValue).subscribe((data) => {
      this.getCinemas();
      this.deleteModal.hide();
    });
  }

  openDeleteModal(id: number | undefined) {
    this.selectedValue = id;
    this.deleteModal.show();
  }

  getCinemaById(id: number | undefined) {
    this.cinemaService.getCinemaById(id).subscribe({
      next: (data) => {
        console.log(data)
        this.cinemaUpdate = data
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  onUpdate(data: Cinema, form: NgForm) {
    this.cinemaService.updateCinema(data, this.cinemaFile, data.id).subscribe({
      next: (value) => {
        this.getCinemas();
        form.control.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Cập nhật phim',
          detail: 'Cập nhật phim thành công'
        })
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Cập nhật phim',
          detail: 'Cập nhật phim thất bại'
        })
      }
    })
    console.log(data);
  }
}
