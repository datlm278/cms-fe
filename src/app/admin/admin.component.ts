import { Component, OnInit } from '@angular/core';
import MENU from '../menus.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sidebarExpanse = true;
  menus: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menus = MENU;
  }

  getName() {
    return 'Administrator';
  }

  getDescription() {
    return 'CMS';
  }

}
