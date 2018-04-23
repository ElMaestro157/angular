import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.redux';
import { BASE_URL } from '../../appSettings';
import { User } from './../../entities';
import { STORE_USER, UNLOAD_USER } from './login-service-reducer';

@Injectable()
export class LoginService {

  private _token: string = null;

  get getToken(): string {
    return this._token;
  }

  // Observable for user's name for LogoComponent
  get getUserNameObs(): Observable<string> {
    return this.store.select('user').map(user => user ? user.getName.first + ' ' + user.getName.last : null);
  }

  constructor(private http: Http, private store: Store<AppState>) {
    // Getting user from sessionStorage, if exists
    const temp = JSON.parse(sessionStorage.getItem('user'));
    if (temp) {
      this.store.dispatch({ type: STORE_USER, payload: new User(temp.id, temp.name, temp.login, temp.password, temp.token) });
    }

    // Subscribing on user's changes
    this.store.select('user').subscribe(user => {
      this._token = user ? user.getToken : null;
      sessionStorage.setItem('user', JSON.stringify(user));
    });
  }

  // Request to server for user's info
  getUserInfo(): Observable<User> {
    const headers = new Headers();
    headers.append('Authorization', this._token);

    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Post;
    requestOptions.url = BASE_URL + '/auth/userinfo';
    requestOptions.headers = headers;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res: Response) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .map((user) => this._toDTO(user));
  }

  // Reqeust to server for logging
  login(login: string, password: string): Observable<void> {
    const requestOptions = new RequestOptions();

    requestOptions.method = RequestMethod.Post;
    requestOptions.body = {
      login: login,
      password: password
    };
    requestOptions.url = BASE_URL + '/auth/login';

    const request = new Request(requestOptions);
    return this.http.request(request)
              .map((res: Response) => {
                if (res.status !== 200) {
                  throw new Error(res.statusText);
                }
                return res.json();
              })
              .map(({token}) => {
                this._token = token;
                this.getUserInfo().subscribe((user) => this.store.dispatch({ type: STORE_USER, payload: user }));
              });
  }

  logout() {
    this.store.dispatch({ type: UNLOAD_USER});
  }

  isAuthenticated(): boolean {
    return this._token !== null;
  }

  // Mapping objects to User type
  private _toDTO(user: any): User {
    return new User(user.id, user.name, user.login, user.password, user.fakeToken);
  }
}
