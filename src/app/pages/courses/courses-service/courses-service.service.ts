import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.redux';
import { SET_LIST, ADD_COURSE, EDIT_COURSE, DELETE_COURSE, PUSH_LIST } from '../courses-redux-reducer';
import { SAVE_COURSE, CANCEL_SAVING } from './../../add-course/add-course-reducer';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/skip';

import { CourseItem, Author } from './../../../core/entities';

@Injectable()
export class CoursesService {

  private BASE_URL = 'http://localhost:3004';
  private _count = 10; // Number of courses to load

  // private startObs = new BehaviorSubject<number>(0); // Observable for start number
  private _commonStart = 0; // Start number

  private _searchStart = 0; // Start number
  private _searchLine = '';

  private _length = Infinity; // Length of courses (filtered or not, current view)

  get getList(): Observable<CourseItem[]> {
    return this._store.select('courses');
  }

  constructor(private _http: Http, private _store: Store<AppState>) {
    // Load initial partion
    this._loadToStore(SET_LIST, this._commonStart);
    this._commonStart += this._count;

    // Subscribing on changes from redux course's state for updating list
    this._store.select('addEditCourse').skip(1).subscribe((course) => {
      this._createUpdateCourseFromServer(course).subscribe((res) => {
        if (+res || res === '0') {
          course.id = +res;
          this._store.dispatch({ type: ADD_COURSE, payload: course });
        } else {
          this._store.dispatch({ type: EDIT_COURSE, payload: course });
        }
      });
    });
  }

  // Universal function for pushing/setting list in redux store
  private _loadToStore(type: string, start: number, query?: string, count = this._count) {
    this._getListFromServer(start, query, count).subscribe((courses) => {
      this._store.dispatch({ type: type, payload: courses });
    });
  }

  // Resetting filter
  resetSearch() {
    this._searchLine = '';
    this._searchStart = 0;

    this._loadToStore(SET_LIST, 0, '' , this._commonStart);
  }

  // On Add more click
  increasePages() {
    if (this._searchLine) {
      if (this._length > this._searchStart) {
        this._loadToStore(PUSH_LIST, this._searchStart, this._searchLine);
        this._searchStart += this._count;
      }
    } else {
      if (this._length > this._commonStart) {
        this._loadToStore(PUSH_LIST, this._commonStart);
        this._commonStart += this._count;
      }
    }
  }

  // Filter function (on find click)
  filter(value: string) {
    if (!value) {
      this.resetSearch();
    } else {
      this._searchStart = 0;
      this._searchLine = value;
      this._loadToStore(SET_LIST, this._searchStart, this._searchLine);
      this._searchStart += 10;
    }
  }

  // Removing course from list
  removeItem(item: CourseItem) {
    this._deleteFromServer(item.id).subscribe((courses) => {
      if (this._searchLine) {
        this._searchStart -= 1;
      }
      this._commonStart -= 1;
      this._length -= 1;
      this._store.dispatch({ type: DELETE_COURSE, payload: item });
    });
  }

  // Gettin info about course
  getItem(id: number): Observable<CourseItem> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.BASE_URL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this._http.request(request)
      .map((res) => res.json())
      .map((value) => this._map(value));
  }

  filterOutdated() {
    const date = new Date();
    date.setDate(date.getDate() - 14);

    this._store.select('courses').subscribe(courses => {
      this._store.dispatch({
        type: SET_LIST, payload: courses.filter((val) => {
          return val.date >= date;
        })
      });
    });
  }

  // Function to show, did we load everything from server
  isFullyLoaded(): boolean {
    return !this._searchLine ? this._length <= this._commonStart : this._length <= this._searchStart;
  }

  // Saving course to store
  saveCourseDispatch(course: CourseItem) {
    this._store.select('addEditCourse').dispatch({ type: SAVE_COURSE, payload: course });
  }

  // Dispatching action about cancelling saving
  cancelSavingDispatch() {
    this._store.select('addEditCourse').dispatch({ type: CANCEL_SAVING });
  }

  private _getListFromServer(pages: number = 0, query?: string, count = this._count): Observable<CourseItem[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.BASE_URL + '/courses';
    requestOptions.params = new URLSearchParams();
    if (pages) {
      requestOptions.params.set('start', pages + '');
    } else {
      requestOptions.params.set('start', '0');
    }
    requestOptions.params.set('count', `${count}`);
    if (query) {
      requestOptions.params.set('query', query);
    }

    const request = new Request(requestOptions);
    return this._http.request(request)
              .map((res) => res.json())
              .map((coursesObj) => {
                this._length = coursesObj.length;
                return Array.from(coursesObj.courses).map((obj) => this._map(obj));
              });
  }

  private _deleteFromServer(id: number): Observable<Response> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Delete;
    requestOptions.url = this.BASE_URL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this._http.request(request);
  }

  private _createUpdateCourseFromServer(course: CourseItem): Observable<String> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Post;
    requestOptions.url = this.BASE_URL + '/courses';
    requestOptions.body = this._mapReverse(course);
    if (course.id || course.id === 0) {
      requestOptions.url += '/' + course.id;
      requestOptions.body.id = course.id;
    }
    const request = new Request(requestOptions);
    return this._http.request(request)
                .map(res => res.text());
  }

  private _map(val: any): CourseItem {
    return new CourseItem(+val.id,
      val.name, new Date(val.date),
      +val.length, val.description,
      !!val.isTopRated,
      this._mapAuthors(val.authors));
  }

  private _mapReverse(course: CourseItem): any {
    return {
      // id: course.id,
      name: course.title,
      description: course.description,
      isTopRated: course.topRated,
      date: course.date.toDateString(),
      authors: this._mapAuthorsReverse(course.authors),
      length: '' + course.duration,
    };
  }

  private _mapAuthors(authors: any[]): Author[] {
    return authors.map((value) => new Author(value.id, value.firstName, value.lastName));
  }

  private _mapAuthorsReverse(authors: Author[]): any[] {
    return authors.map((value) => {
      return {
        id: value.getId,
        firstName: value.getFirstName,
        lastName: value.getLastName
      };
    });
  }

}
