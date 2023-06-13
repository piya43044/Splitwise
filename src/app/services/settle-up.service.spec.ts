import { TestBed } from '@angular/core/testing';

import { SettleUpService } from './settle-up.service';

describe('SettleUpService', () => {
  let service: SettleUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettleUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
