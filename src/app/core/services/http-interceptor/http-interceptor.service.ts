import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
           Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('user') !== 'null') {
      const newReq = req.clone({ headers: req.headers.set('Authorization', JSON.parse(sessionStorage.getItem('user')).token) });
      return next.handle(newReq);
    }
    return next.handle(req);
  }

  constructor() { }
}
