import {Component, OnInit} from '@angular/core';
import {Producer} from "../../models/producer";
import {ProducerService} from "../../services/producer.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {AddOrEditProducerComponent, AddOrEditProducerData} from "./add-or-edit-producer/add-or-edit-producer.component";
import {ConfirmDialogModel, DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  producers: Producer[] = [];
  private selectedValue: number | undefined = -1;
  producer: Producer = {
    description: "", image: "", name: "", status: 0
  }

  constructor(
    private producerService: ProducerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducers();
  }

  openCreateDialog() {
    this.dialog.open(AddOrEditProducerComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getProducers()
      }
    })
  }

  openUpdateDialog(id: number | undefined) {
    this.producerService.getProducerById(id).subscribe(
      (response) => {
        this.producer = response;
        console.log("getCinemaTypeById", response)
        setTimeout(() => {
          const dialogData = new AddOrEditProducerData(this.producer, this.producer.image)
          this.dialog.open(AddOrEditProducerComponent,
            {
              width: "30%",
              data: dialogData
            }).afterClosed().subscribe(value => {
            if (value === 'update') {
              this.getProducers();
            }
          })
        });
      })
  }

  openDeleteDialog(id: number | undefined) {
    this.selectedValue = id;
    const message = `Bạn có chắc chắn muốn xoá nhà sản xuất đã chọn?`;

    const dialogData = new ConfirmDialogModel("Xác nhận xoá", message);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.producerService.deleteProducer(this.selectedValue)
          .subscribe(
            (response) => {
              console.log(response);
              this.getProducers();
            },
            (error: HttpErrorResponse) => {
              alert(error.message)
            }
          )
      } else {
        this.getProducers();
      }
    });
  }

  openImageDialog() {

  }

  private getProducers() {
    this.producerService.getAllProducers()
      .subscribe(
        (res) => {
          this.producers = res;
          console.log(res)
        },
        (err: HttpErrorResponse) => {
          console.log(err.message)
        });

  }
}
