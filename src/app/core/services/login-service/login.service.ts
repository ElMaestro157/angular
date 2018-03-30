import { User } from './../../entities';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, ResponseContentType, Headers } from '@angular/http';


@Injectable()
export class LoginService {

  private userName: BehaviorSubject<string> = new BehaviorSubject(null);
  private token: string = null;

  get getToken(): string {
    return this.token;
  }

  private baseURL = 'http://localhost:3004';

  constructor(private http: Http) { }

  public get userNameObs(): Observable<string> {
    return this.userName.asObservable();
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
      });
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
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
              .map((user) => {
                this.userName.next(login);
                this.token = user.token + '';
              });
  }

  logout() {
    this.userName.next(null);
    this.token = null;
  }

  isAuthenticated(): boolean {
    return this.userName.getValue() !== null && this.token !== null;
  }
}
