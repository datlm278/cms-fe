import { Component, OnInit } from '@angular/core';
import PRODUCER from '../producer.json';
import TYPE from '../cinema-type.json';
import {Cinema} from 'src/app/models/cinema';
import {CinemaService} from "../../services/cinema.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public cinemas: Cinema[] = [];
  cinema: Cinema = {
    cinemaType: "",
    createTime: "",
    director: "",
    name: "",
    producerName: "",
    releaseDate: "",
    updateTime: ""
  }

  producers: any[] = [];
  cinemaTypes: any[] = [];
  private selectedValue: number | undefined = -1;
  private deleteModal: any;

  constructor(
    private cinemaService: CinemaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCinemas();
    this.producers = PRODUCER;
    this.cinemaTypes = TYPE;
  }

  private getCinemas(): void {
    this.cinemaService.getAll().subscribe(
      (response: Cinema[]) => {
        this.cinemas = response;
        console.log(response);
      },
      (error: HttpErrorResponse)  => {
        console.log(error.message);
      }
    )
  }

  onSubmit(data: Cinema, form: NgForm) {
    this.cinemaService.createCinema(data).subscribe({
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
    this.cinemaService.deleteCinema(this.selectedValue).subscribe(
      (data) => {
        this.getCinemas();
        this.deleteModal.hide();
      }
    )
  }

  openDeleteModal(id: number | undefined) {
    this.selectedValue = id;
    this.deleteModal.show();
  }
}
