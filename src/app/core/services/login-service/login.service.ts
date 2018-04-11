import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { User } from './../../entities';
import { AppState } from '../../../app.redux';
import { STORE_USER, UNLOAD_USER } from './login-service-reducer';

@Injectable()
export class LoginService {

  private token: string = null;

  get getToken(): string {
    return this.token;
  }

  get getUserNameObs(): Observable<string> {
    return this.store.select('user').map(user => user ? user.getName.first + ' ' + user.getName.last : null);
  }

  private baseURL = 'http://localhost:3004';

  constructor(private http: Http, private store: Store<AppState>) {
    this.store.select('user').subscribe(user => {
      this.token = user ? user.getToken : null;
    });
  }

  getUserInfo(): Observable<User> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Post;
    requestOptions.url = this.baseURL + '/auth/userinfo';
    requestOptions.headers = headers;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res: Response) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .map((user) => this.map(user));
  }

  login(login: string, password: string): Observable<void> {
    const requestOptions = new RequestOptions();

    requestOptions.method = RequestMethod.Post;
    requestOptions.body = {
      login: login,
      password: password
    };
    requestOptions.url = this.baseURL + '/auth/login';

    const request = new Request(requestOptions);
    return this.http.request(request)
              .map((res: Response) => {
                if (res.status !== 200) {
                  throw new Error(res.statusText);
                }
                return res.json();
              })
              .map(({token}) => {
                this.token = token;
                this.getUserInfo().subscribe((user) => this.store.dispatch({ type: STORE_USER, payload: user }));
              });
  }

  logout() {
    this.store.dispatch({ type: UNLOAD_USER});
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  private map(user: any): User {
    return new User(user.id, user.name, user.login, user.password, user.fakeToken);
  }
}
