import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BASE_URL } from '../../../../core/appSettings';
import { Author, CourseItem } from '../../../../core/entities';

@Injectable()
export class AuthorsService {

  constructor(private _http: HttpClient) { }

  getAuthors(course?: CourseItem): Observable<Author[]> {
    const url: string = BASE_URL + '/courses' + (course ? `/${course.id}` : '/getAuthors');

    return this._http.get<any>(url)
          .map(value => course ? value.authors.map((author: any) => Author.toDTO(author))
            : value.map((author: any) => Author.toDTO(author)));
  }
}
