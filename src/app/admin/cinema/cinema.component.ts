import { Component, OnInit } from '@angular/core';
import CINEMA from '../cinema.json';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemas: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.cinemas = CINEMA;
  }

}
