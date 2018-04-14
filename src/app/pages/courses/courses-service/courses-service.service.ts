import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.redux';
import { SET_LIST, ADD_COURSE, EDIT_COURSE, DELETE_COURSE, PUSH_LIST } from '../courses-redux-reducer';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/skip';

import { CourseItem, Author } from './../../../core/entities';

@Injectable()
export class CoursesService {

  private baseURL = 'http://localhost:3004';
  private count = 10; // Number of courses to load

  private startObs = new BehaviorSubject<number>(0); // Observable for start number
  private start = 0; // Start number
  private search = new BehaviorSubject<string>(null); // Search line
  private length = Infinity; // Length of courses

  get getList(): Observable<CourseItem[]> {
    return this.store.select('courses');
  }

  constructor(private http: Http, private store: Store<AppState>) {
    this.startObs.subscribe((val) => {
      this.getListFromServer(val).subscribe((courses) => {
        this.store.dispatch({ type: PUSH_LIST, payload: courses });
      });
    });

    this.search.skip(1).subscribe((val) => {
      this.getListFromServer(this.start, val).subscribe((courses) => {
        this.store.dispatch({ type: SET_LIST, payload: courses });
      });
    });

    // Subscribing on changes from redux course's state for updating list
    this.store.select('addEditCourse').skip(1).subscribe((course) => {
      this.createUpdateCourseFromServer(course).subscribe((res) => {
        if (+res || res === '0') {
          course.id = +res;
          this.store.dispatch({ type: ADD_COURSE, payload: course });
        } else {
          this.store.dispatch({ type: EDIT_COURSE, payload: course });
        }
      });
    });
  }

  increasePages() {
    this.start += this.count;
    this.length > this.start
      ? this.search.value
          ? this.search.next(this.search.value)
          : this.startObs.next(this.start)
      : this.start -= this.count;
  }

  filter(value: string) {
    this.start = 0;
    this.search.next(value);
  }

  removeItem(item: CourseItem) {
    this.deleteFromServer(item.id).subscribe((courses) => {
      this.start -= 1;
      this.length -= 1;
      this.store.dispatch({ type: DELETE_COURSE, payload: item });
    });
  }

  getItem(id: number): Observable<CourseItem> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res) => res.json())
      .map((value) => this.map(value));
  }

  filterOutdated() {
    const date = new Date();
    date.setDate(date.getDate() - 14);

    this.store.select('courses').subscribe(courses => {
      this.store.dispatch({
        type: SET_LIST, payload: courses.filter((val) => {
          return val.date >= date;
        })
      });
    });
  }

  private getListFromServer(pages: number = 0, query?: string): Observable<CourseItem[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/courses';
    requestOptions.params = new URLSearchParams();
    if (pages) {
      requestOptions.params.set('start', pages + '');
    } else {
      requestOptions.params.set('start', '0');
    }
    requestOptions.params.set('count', `${this.count}`);
    if (query) {
      requestOptions.params.set('query', query);
    }

    const request = new Request(requestOptions);
    return this.http.request(request)
              .map((res) => res.json())
              .map((coursesObj) => {
                this.length = coursesObj.length;
                return Array.from(coursesObj.courses).map((obj) => this.map(obj));
              });
  }

  private deleteFromServer(id: number): Observable<Response> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Delete;
    requestOptions.url = this.baseURL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this.http.request(request);
  }

  private createUpdateCourseFromServer(course: CourseItem): Observable<String> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Post;
    requestOptions.url = this.baseURL + '/courses';
    requestOptions.body = this.mapReverse(course);
    if (course.id || course.id === 0) {
      requestOptions.url += '/' + course.id;
      requestOptions.body.id = course.id;
    }
    const request = new Request(requestOptions);
    return this.http.request(request)
                .map(res => res.text());
  }

  private map(val: any): CourseItem {
    return new CourseItem(+val.id,
      val.name, new Date(val.date),
      +val.length, val.description,
      !!val.isTopRated,
      this.mapAuthors(val.authors));
  }

  private mapReverse(course: CourseItem): any {
    return {
      // id: course.id,
      name: course.title,
      description: course.description,
      isTopRated: course.topRated,
      date: course.date.toDateString(),
      authors: this.mapAuthorsReverse(course.authors),
      length: '' + course.duration,
    };
  }

  private mapAuthors(authors: any[]): Author[] {
    return authors.map((value) => new Author(value.id, value.firstName, value.lastName));
  }

  private mapAuthorsReverse(authors: Author[]): any[] {
    return authors.map((value) => {
      return {
        id: value.getId,
        firstName: value.getFirstName,
        lastName: value.getLastName
      };
    });
  }

}
