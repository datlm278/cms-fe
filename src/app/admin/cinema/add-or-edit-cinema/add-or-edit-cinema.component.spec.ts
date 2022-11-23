import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCinemaComponent } from './add-or-edit-cinema.component';

describe('AddOrEditCinemaComponent', () => {
  let component: AddOrEditCinemaComponent;
  let fixture: ComponentFixture<AddOrEditCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
