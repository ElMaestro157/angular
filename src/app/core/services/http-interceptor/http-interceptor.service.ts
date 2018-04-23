import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(protected _backend: XHRBackend, protected _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }

  private _setCustomHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions({});
    }
    if (sessionStorage.getItem('id_token')) {
      if (!options.headers) {
        options.headers = new Headers();
      }
      options.headers.set('Authorization', JSON.parse(sessionStorage.getItem('user')).token);
    }
    return options;
  }


  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (url instanceof Request) {
      if (sessionStorage.getItem('user') && sessionStorage.getItem('user') !== 'null') {
        url.headers.set('Authorization', JSON.parse(sessionStorage.getItem('user')).token);
      }
      return super.request(url);
    }
    options = this._setCustomHeaders(options);
    return super.request(url, options);
  }
}
