import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
