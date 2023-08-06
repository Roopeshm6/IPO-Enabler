import { TestBed } from '@angular/core/testing';

import { FunctionalAreaService } from './functional-area.service';

describe('FunctionalAreaService', () => {
  let service: FunctionalAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionalAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
