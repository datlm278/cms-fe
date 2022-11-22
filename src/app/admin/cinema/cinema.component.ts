import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { CinemaService } from '../../services/cinema.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {ProducerService} from "../../services/producer.service";
import {CinemaTypeService} from "../../services/cinema-type.service";
import {CinemaType} from "../../models/cinemaType";
import {Producer} from "../../models/producer";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddOrEditCinemaComponent} from "./add-or-edit-cinema/add-or-edit-cinema.component";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
})
export class CinemaComponent implements OnInit {

  cinemas: Cinema[] = [];

  private selectedValue: number | undefined = -1;
  private deleteModal: any;
  public cinemaFile: string | Blob = '';
  url: string = '';

  constructor(
    private cinemaService: CinemaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCinemas();

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

  openDialog() {
    this.dialog.open(AddOrEditCinemaComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getCinemas();
      }
    })
  }

  onSelectedFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      this.cinemaFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  onSubmit(data: Cinema, form: NgForm) {
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

  // getCinemaById(id: number | undefined) {
  //   this.cinemaService.getCinemaById(id).subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       this.cinemaUpdate = data
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   });
  // }

  onUpdate(data: Cinema, form: NgForm) {
    console.log(data);
  }
}
