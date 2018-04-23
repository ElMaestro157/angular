import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BASE_URL } from '../../../../core/appSettings';
import { Author, CourseItem } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  constructor(private _http: Http) { }

  getAuthors(course?: CourseItem): Observable<Author[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = BASE_URL + '/courses';
    if (course) {
      requestOptions.url += `/${course.id}`;
    } else {
      requestOptions.url += '/getAuthors';
    }

    const request = new Request(requestOptions);

    return this._http.request(request)
          .map((res) => res.json())
          .map(value => course ? this._toDTO(value.authors) : this._toDTO(value));
  }

  private _toDTO(authors: any[]): Author[] {
    return authors.map((value) => new Author(value.id, value.firstName, value.lastName));
  }
}
