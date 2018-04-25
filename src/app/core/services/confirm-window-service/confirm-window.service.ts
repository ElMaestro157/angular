import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AlertService } from './../alert-service/alert.service';

@Injectable()
export class ConfirmWindowService extends AlertService {

  private _agreed = new Subject<boolean>();

  public get isAgreed(): Observable<boolean> {
    return this._agreed.asObservable();
  }

  constructor() {
    super();
  }

  agreed() {
    this._agreed.next(true);
  }

  declined() {
    this._agreed.next(false);
  }

}
