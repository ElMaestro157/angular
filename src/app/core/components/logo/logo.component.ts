import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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

  constructor(private ref: ChangeDetectorRef, private loginService: LoginService, private router: Router) {
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
    this.router.navigateByUrl('/login');
  }

  breadCrumbClick() {
    this.router.navigateByUrl('courses');
  }

  getUserName(): Observable<string> {
    return this.loginService.getUserName();
  }

  getCourseName(): Observable<string> {
    return new Observable();
  }

  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

}
