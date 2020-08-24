import { TestBed } from '@angular/core/testing';

import { MediatekaRestService } from './mediateka-rest.service';

describe('MediatekaRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediatekaRestService = TestBed.get(MediatekaRestService);
    expect(service).toBeTruthy();
  });
});
