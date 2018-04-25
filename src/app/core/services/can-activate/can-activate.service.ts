import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './../login-service';

@Injectable()
export class CanActivateService implements CanActivate {

  constructor(private _router: Router, private _authServ: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this._authServ.getToken) {
      this._router.navigateByUrl('');
    }
    return !!this._authServ.getToken;
  }

}
