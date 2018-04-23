import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginServiceMock {

  private name: BehaviorSubject<string> = new BehaviorSubject(null);
  private token: string;

  constructor() {
  }

  public setToken(value: string) {
    this.token = value;
  }

  public get getToken(): string {
    return this.token;
  }

  public setName(val: string) {
    this.name.next(val);
  }

  get getUserNameObs(): Observable<string> {
    return this.name.asObservable();
  }

  isAuthenticated(): boolean {
    return this.name.getValue() !== null;
  }

}
