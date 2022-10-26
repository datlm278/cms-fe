import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaTypeComponent } from './cinema-type.component';

describe('CinemaTypeComponent', () => {
  let component: CinemaTypeComponent;
  let fixture: ComponentFixture<CinemaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
