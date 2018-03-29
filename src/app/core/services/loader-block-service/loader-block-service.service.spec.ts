import { TestBed, inject } from '@angular/core/testing';

import { LoaderBlockServiceService } from './loader-block-service.service';

describe('LoaderBlockServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderBlockServiceService]
    });
  });

  it('should be created', inject([LoaderBlockServiceService], (service: LoaderBlockServiceService) => {
    expect(service).toBeTruthy();
  }));
});
