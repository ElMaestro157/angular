import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

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

  it('should make its state correct at changes', inject([LoaderBlockServiceService], fakeAsync((service: LoaderBlockServiceService) => {
    service.show();
    service.getShow.skip(1).subscribe(value => {
      expect(value).toBeTruthy();
    });
    tick();
    service.hide();
    service.getShow.subscribe(value => {
      expect(value).toBeFalsy();
    });
  })));
});
