import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit, OnDestroy {

  public LOGO = 'app/core/components/logo/logo.png';
  private subscriber: Subscription;

  constructor(private ref: ChangeDetectorRef, private loginService: LoginService) {
  }

  ngOnInit() {
    this.subscriber = this.loginService.userNameObs.subscribe((val) => {
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  logoff() {
    this.loginService.logout();
  }

  getUserName(): Observable<string> {
    return this.loginService.getUserName();
  }

  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

}
