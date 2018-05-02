import { inject, TestBed } from '@angular/core/testing';

import { AlertInterceptor } from './alert.interceptor';

describe('AlertInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertInterceptor]
    });
  });

  it(
    'should be created',
    inject([AlertInterceptor], (service: AlertInterceptor) => {
      expect(service).toBeTruthy();
    })
  );
});
