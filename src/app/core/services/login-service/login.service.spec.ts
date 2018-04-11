import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreModule, Store } from '@ngrx/store';
import { reducers, AppState } from './../../../app.redux';
import { STORE_USER, UNLOAD_USER } from './login-service-reducer';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let store: Store<AppState>;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        LoginService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    });
    store = TestBed.get(Store);
    http = TestBed.get(Http);
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should call request on login', inject([LoginService], (service: LoginService) => {
    const spy = spyOn(http, 'request').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    service.login('login', 'password');
    expect(spy).toHaveBeenCalled();
  }));

  // it('should return observable on name from store', inject([LoginService], fakeAsync((service: LoginService) => {
  //   const mock = spyOn(store.select('login'), 'select').and.returnValue(Store.of('name'));
  //   tick();
  //   const temp = service.getUserNameObs;
  //   tick();
  //   expect(mock).toHaveBeenCalled();
  // })));

  it('should call dispatch on logout', inject([LoginService], (service: LoginService) => {
    const spy = spyOn(store, 'dispatch');
    service.logout();
    expect(spy).toHaveBeenCalled();
  }));

  it('should return correct authentication state', inject([LoginService], fakeAsync((service: LoginService) => {
    store.dispatch({ type: STORE_USER, payload: {name: 'name', token: 'token'}});
    expect(service.isAuthenticated()).toBeTruthy();
    service.logout();
    tick();
    expect(service.isAuthenticated());
  })));
});
