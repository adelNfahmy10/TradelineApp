import { TestBed } from '@angular/core/testing';

import { Premium } from './premium';

describe('Premium', () => {
  let service: Premium;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Premium);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
