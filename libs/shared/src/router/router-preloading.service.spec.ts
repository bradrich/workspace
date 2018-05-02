import { inject, TestBed } from '@angular/core/testing';

import { RouterPreloadingService } from './router-preloading.service';

describe('RouterPreloadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterPreloadingService]
    });
  });

  it(
    'should be created',
    inject([RouterPreloadingService], (service: RouterPreloadingService) => {
      expect(service).toBeTruthy();
    })
  );
});
