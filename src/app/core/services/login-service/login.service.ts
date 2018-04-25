import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.store.select('user').map((user: User) => user ? user.getName.first + ' ' + user.getName.last : null);
  }

  constructor(private http: HttpClient, private store: Store<AppState>) {
    // Getting user from sessionStorage, if exists
    const temp: any = JSON.parse(sessionStorage.getItem('user'));
    if (temp) {
      this.store.dispatch({ type: STORE_USER, payload: new User(temp.id, temp.name, temp.login, temp.password, temp.token) });
    }

    // Subscribing on user's changes
    this.store.select('user').subscribe((user: User) => {
      this._token = user ? user.getToken : null;
      sessionStorage.setItem('user', JSON.stringify(user));
    });
  }

  // Request to server for user's info
  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders().append('Authorization', this._token);

    return this.http.post(BASE_URL + '/auth/userinfo', { }, {
      headers: headers
    })
    .map((user) => User.toDTO(user));
  }

  // Reqeust to server for logging
  login(login: string, password: string): Observable<void> {
    return this.http.post<any>(BASE_URL + '/auth/login', {
      login: login,
      password: password
    })
    .map(({ token }) => {
      this._token = token;
      this.getUserInfo().subscribe((user: User) => this.store.dispatch({ type: STORE_USER, payload: user }));
    });
  }

  logout() {
    this.store.dispatch({ type: UNLOAD_USER});
  }

  isAuthenticated(): boolean {
    return this._token !== null;
  }
}
