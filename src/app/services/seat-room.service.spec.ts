import { TestBed } from '@angular/core/testing';

import { SeatRoomService } from './seat-room.service';

describe('SeatRoomService', () => {
  let service: SeatRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
