import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatRoomComponent } from './seat-room.component';

describe('SeatRoomComponent', () => {
  let component: SeatRoomComponent;
  let fixture: ComponentFixture<SeatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
