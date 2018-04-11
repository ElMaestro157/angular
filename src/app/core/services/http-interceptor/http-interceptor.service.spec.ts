import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { LoginService, LoginServiceMock } from '..';

describe('HttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorService,
      { provide: LoginService, useClass: LoginServiceMock}
      ]});
  });

  it('should be created', inject([HttpInterceptorService], (service: HttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
