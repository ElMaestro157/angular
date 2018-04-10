import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderBlockServiceMock {

  private show: Subject<boolean> = new Subject();

  constructor() {}

  public setShow(val: boolean) {
    this.show.next(val);
  }

  public get getShow(): Observable<boolean> {
    return this.show.asObservable();
  }
}
