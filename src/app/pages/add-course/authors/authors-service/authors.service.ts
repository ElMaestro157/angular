import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CourseItem } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  private baseURL = 'http://localhost:3004';

  constructor(private http: Http) { }

  getAuthors(course?: CourseItem): Observable<any[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/authors';
    if (course) {
      requestOptions.params = new URLSearchParams();
      requestOptions.params.set('id', course.id + '');
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
          .map((res) => res.json());
  }
}
