import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditProducerComponent } from './add-or-edit-producer.component';

describe('AddOrEditProducerComponent', () => {
  let component: AddOrEditProducerComponent;
  let fixture: ComponentFixture<AddOrEditProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditProducerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
