import { TestBed } from '@angular/core/testing';

import { NearbystoresService } from './nearbystores-service';

describe('NearbystoresService', () => {
  let service: NearbystoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NearbystoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
