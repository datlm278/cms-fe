import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CinemaType } from 'src/app/models/cinemaType';
import { CinemaTypeService } from 'src/app/services/cinema-type.service';
import { AddOrEditCinemaTypeComponent } from './add-or-edit-cinema-type/add-or-edit-cinema-type.component';

@Component({
  selector: 'app-cinema-type',
  templateUrl: './cinema-type.component.html',
  styleUrls: ['./cinema-type.component.css']
})
export class CinemaTypeComponent implements OnInit {

  cinemaTypes: CinemaType[] = [];
  private selectValue: number | undefined = -1;

  private cinemaType: CinemaType = {
    id: 0,
    name: '',
    createTime: '',
    updateTime: '',
    description: ''
  }

  constructor(
    private cinemaTypeService: CinemaTypeService,
    public dialog: MatDialog,
  ) { }

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

  openUpdateDialog() {}

  openDeleteDialog() {}

}
