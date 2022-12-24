import {Component, Inject, OnInit} from '@angular/core';
import {Producer} from "../../../models/producer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProducerService} from "../../../services/producer.service";
import {NgForm} from "@angular/forms";
import {ImageService} from "../../../services/image.service";

export class AddOrEditProducerData {
  constructor(
    public producer: Producer,
    public image: string) {
  }
}

@Component({
  selector: 'app-add-or-edit-producer',
  templateUrl: './add-or-edit-producer.component.html',
  styleUrls: ['./add-or-edit-producer.component.css']
})
export class AddOrEditProducerComponent implements OnInit {

  title: string = "Thêm mới nhà sản xuất"
  action: string = "Thêm mới"
  producer: Producer = {
    description: "",
    image: "",
    name: "",
    status: 0
  };
  public imageProducer: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddOrEditProducerComponent>,
    private producerService: ProducerService,
    @Inject(MAT_DIALOG_DATA) public producerData: AddOrEditProducerData) {
  }

  ngOnInit(): void {
    if (this.producerData) {
      this.action = "Cập nhật"
      this.title = "Cập nhật nhà sản xuất"
      this.producer = this.producerData.producer;
      this.imageProducer = this.producerData.image;
    }
  }

  onSelectedFile(event) {
    if (event.target.files) {
      this.imageProducer = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.producer.image = event.target.result;
      }
    }
  }

  createOrUpdateProducer(producer: Producer, form: NgForm) {
    if (!this.producerData) {
      this.createProducer(producer, form);
    } else {
      this.updateProducer(producer, form);
    }
    console.log(producer)
  }

  close() {
    this.dialogRef.close();
  }

  private createProducer(producer: Producer, form: NgForm) {
    const producerData = this.prepareFormData(producer, this.imageProducer);
    this.producerService.createProducer(producerData)
      .subscribe(
        (res) => {
          form.reset();
          this.dialogRef.close("save")
          console.log(res)
        },
        (error) => {
          alert("Thêm mới nhà sản xuất thất bại")
          console.log(error)
        }
      )
  }

  private updateProducer(producer: Producer, form: NgForm) {
    const producerData = this.prepareFormData(producer, this.imageProducer);
    this.producerService.updateProducer(producerData, producer.id)
      .subscribe(
        (res) => {
          form.reset();
          this.dialogRef.close("update")
          console.log(res)
        },
        (error) => {
          alert("Cập nhật nhà sản xuất thất bại")
          console.log(error)
        }
      )
  }

  prepareFormData(producer: Producer, file: any): FormData {
    const formData = new FormData();
    formData.append(
      'producer',
      new Blob([JSON.stringify(producer)], {type: 'application/json'})
    );
    formData.append(
      'image',
      file,
      file.name
    );
    return formData;
  }
}
