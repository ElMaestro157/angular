import { Observable } from 'rxjs/Observable';
import { LoginService } from './../login-service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateService implements CanActivate {

  constructor(private authServ: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return !!this.authServ.getToken;
  }

}
