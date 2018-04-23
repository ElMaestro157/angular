import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let http: Http;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorsService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    });
    http = TestBed.get(Http);
  });

  it('should be created', inject([AuthorsService], (service: AuthorsService) => {
    expect(service).toBeTruthy();
  }));

  it('should call request at getAuthors method', inject([AuthorsService], (service: AuthorsService) => {
    const spy = spyOn(http, 'request').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    service.getAuthors();
    expect(spy).toHaveBeenCalled();
  }));
});
