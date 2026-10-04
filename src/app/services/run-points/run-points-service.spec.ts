import { TestBed } from '@angular/core/testing';

import { RunPointsService } from './run-points-service';

describe('RunPointsService', () => {
  let service: RunPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
