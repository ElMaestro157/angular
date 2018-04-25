import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

  private _show = new Subject<string>();

  public get showing(): Observable<string> {
    return this._show.asObservable();
  }

  constructor() { }

  show(message: string) {
    this._show.next(message);
  }

  hide() {
    this._show.next(null);
  }

}
