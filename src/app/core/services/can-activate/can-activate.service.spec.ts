import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService, LoginServiceMock } from '..';
import { CanActivateService } from './can-activate.service';

const routerState = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

describe('CanActivateService', () => {
  let mock: LoginServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateService,
        { provide: RouterStateSnapshot, useValue: routerState},
        { provide: LoginService, useClass: LoginServiceMock }
    ]});

    mock = TestBed.get(LoginService);
  });

  it('should be created', inject([CanActivateService], (service: CanActivateService) => {
    expect(service).toBeTruthy();
  }));

  it('should act right', inject([CanActivateService], (service: CanActivateService) => {
      mock.setToken('someToken');
      expect(service.canActivate(new ActivatedRouteSnapshot(), routerState)).toBeTruthy();

      mock.setToken(null);
      expect(service.canActivate(new ActivatedRouteSnapshot(), routerState)).toBeFalsy();
  }));
});
