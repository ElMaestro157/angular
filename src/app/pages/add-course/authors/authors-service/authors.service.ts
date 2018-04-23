import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BASE_URL } from '../../../../core/appSettings';
import { Author, CourseItem } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  constructor(private _http: HttpClient) { }

  getAuthors(course?: CourseItem): Observable<Author[]> {
    const url = BASE_URL + '/courses' + (course ? `/${course.id}` : '/getAuthors');

    return this._http.get<any>(url)
          .map(value => course ? this._toDTO(value.authors) : this._toDTO(value));
  }

  private _toDTO(authors: any[]): Author[] {
    return authors.map((value) => new Author(value.id, value.firstName, value.lastName));
  }
}
