import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LoginService } from '../../services';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit, OnDestroy {

  public logo: string; // Breadcrumb

  private _loginSubscriber: Subscription;
  private _routerSubscriber: Subscription;

  constructor(private _ref: ChangeDetectorRef,
    private _loginService: LoginService,
    private _router: Router) {
  }

  ngOnInit() {
    this._loginSubscriber = this._loginService.getUserNameObs.subscribe(() => {
      this._ref.markForCheck();
    });
    this._routerSubscriber = this._router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        this.logo = events.url.split('/')[1].toUpperCase();
        this._ref.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this._loginSubscriber.unsubscribe();
    this._routerSubscriber.unsubscribe();
  }

  logoff() {
    this._loginService.logout();
    this._router.navigateByUrl('/login');
  }

  breadCrumbClick() {
    this._router.navigateByUrl(`${this.logo.toLowerCase()}`);
  }

  getUserName(): Observable<string> {
    return this._loginService.getUserNameObs;
  }

  isAuthenticated(): boolean {
    return this._loginService.isAuthenticated();
  }

}
