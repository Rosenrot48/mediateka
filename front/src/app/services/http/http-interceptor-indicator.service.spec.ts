import { TestBed } from '@angular/core/testing';

import { HttpInterceptorIndicatorService } from './http-interceptor-indicator.service';

describe('HttpInterceptorIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorIndicatorService = TestBed.get(HttpInterceptorIndicatorService);
    expect(service).toBeTruthy();
  });
});
