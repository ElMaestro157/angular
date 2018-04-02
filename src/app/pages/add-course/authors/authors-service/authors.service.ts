import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CourseItem } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  private baseURL = 'http://localhost:3004';

  constructor(private http: Http) { }

  getAuthors(course?: CourseItem): Observable<string[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/courses';
    if (course) {
      requestOptions.url += `/${course.id}`;
    } else {
      requestOptions.url += '/getAuthors';
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
          .map((res) => res.json())
          .map(value => course ? value.authors : value);
  }
}
