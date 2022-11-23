import { TestBed } from '@angular/core/testing';

import { CinemaTypeService } from './cinema-type.service';

describe('CinemaTypeService', () => {
  let service: CinemaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
