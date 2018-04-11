import { Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CourseItem, Author } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  private baseURL = 'http://localhost:3004';

  constructor(private http: Http) { }

  getAuthors(course?: CourseItem): Observable<Author[]> {
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
          .map(value => course ? this.mapAuthors(value.authors) : this.mapAuthors(value));
  }

  private mapAuthors(authors: any[]): Author[] {
    return authors.map((value) => new Author(value.id, value.firstName, value.lastName));
  }
}
