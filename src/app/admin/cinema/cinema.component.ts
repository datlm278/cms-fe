import { Component, OnInit } from '@angular/core';
import CINEMA from '../cinema.json';
import PRODUCER from '../producer.json';
import TYPE from '../cinema-type.json';
import { cinema } from 'src/app/models/cinema';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemas: any[] = []
  producers: any[] = []
  cinemaTypes: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.cinemas = CINEMA;
    this.producers = PRODUCER;
    this.cinemaTypes = TYPE;
  }

}
