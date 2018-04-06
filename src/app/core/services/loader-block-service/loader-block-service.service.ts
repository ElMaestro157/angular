import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderBlockServiceService {

  private _show: Subject<boolean> = new Subject();

  public get getShow(): Observable<boolean> {
    return this._show.asObservable();
  }

  constructor() {
    this._show.next(false);
  }

  show() {
    this._show.next(true);
  }

  hide() {
    this._show.next(false);
  }

}
