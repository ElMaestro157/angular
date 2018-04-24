import { TestBed, inject } from '@angular/core/testing';

import { ConfirmWindowService } from './confirm-window.service';

describe('ConfirmWindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmWindowService]
    });
  });

  it('should be created', inject([ConfirmWindowService], (service: ConfirmWindowService) => {
    expect(service).toBeTruthy();
  }));
});
