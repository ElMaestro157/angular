import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoginService } from './../login-service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('Authorization', this.auth.getToken) });

    return next.handle(authReq);
  }

}
