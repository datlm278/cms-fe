import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {CinemaTypeComponent} from "./admin/cinema-type/cinema-type.component";
import {ProducerComponent} from "./admin/producer/producer.component";
import {CinemaComponent} from "./admin/cinema/cinema.component";
import {CinemaRoomComponent} from "./admin/cinema-room/cinema-room.component";
import {SeatRoomComponent} from "./admin/seat-room/seat-room.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'cinema-type', component: CinemaTypeComponent},
      { path: 'producer', component: ProducerComponent},
      { path: 'cinema', component: CinemaComponent},
      { path: 'cinema-room', component: CinemaRoomComponent},
      { path: 'seat-room', component: SeatRoomComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
