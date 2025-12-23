import { TestBed } from '@angular/core/testing';

import { Easypay } from './easypay';

describe('Easypay', () => {
  let service: Easypay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Easypay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
