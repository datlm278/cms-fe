import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCinemaTypeComponent } from './add-or-edit-cinema-type.component';

describe('AddOrEditCinemaTypeComponent', () => {
  let component: AddOrEditCinemaTypeComponent;
  let fixture: ComponentFixture<AddOrEditCinemaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCinemaTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCinemaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
