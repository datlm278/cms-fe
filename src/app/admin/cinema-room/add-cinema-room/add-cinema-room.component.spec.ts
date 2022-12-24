import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCinemaRoomComponent } from './add-cinema-room.component';

describe('AddCinemaRoomComponent', () => {
  let component: AddCinemaRoomComponent;
  let fixture: ComponentFixture<AddCinemaRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCinemaRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCinemaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
