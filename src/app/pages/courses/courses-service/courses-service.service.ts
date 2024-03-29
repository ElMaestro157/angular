import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.redux';
import { BASE_URL } from '../../../core/appSettings';
import { ADD_COURSE, DELETE_COURSE, EDIT_COURSE, PUSH_LIST, SET_LIST } from '../courses-redux-reducer';
import { Author, CourseItem } from './../../../core/entities';
import { CANCEL_SAVING, SAVE_COURSE } from './../../add-course/add-course-reducer';

@Injectable()
export class CoursesService {

  private _COUNT = 10; // Number of courses to load

  private _start = 0; // Start number
  private _search = new BehaviorSubject<string>(null); // Search line
  private _length: number; // Length of courses (filtered or not, current view)

  get getList(): Observable<CourseItem[]> {
    return this._store.select('courses');
  }

  constructor(private _http: HttpClient, private _store: Store<AppState>) {
    // Load initial partion
    this._loadToStore(SET_LIST);
    this._start += this._COUNT;

    this._search.skip(1).subscribe((val: string) => {
      this._loadToStore(SET_LIST, this._start, val);
    });

    // Subscribing on changes from redux course's state for updating list
    this._store.select('addEditCourse').skip(1).subscribe((course: CourseItem) => {
      if (course.id) {
        this._updateCourseOnServer(course).subscribe(() => {
          this._store.dispatch({ type: EDIT_COURSE, payload: course });
        });
      } else {
        this._createCourseOnServer(course).subscribe((res: string) => {
          course.id = +res;
          this._store.dispatch({ type: ADD_COURSE, payload: course });
        });
      }
    });
  }

  // Universal function for pushing/setting list in redux store
  private _loadToStore(type: string, start = this._start, query = this._search.value, count = this._COUNT) {
    this._getListFromServer(start, query, count).subscribe((courses: CourseItem[]) => {
      this._store.dispatch({ type: type, payload: courses });
    });
  }

  // Resetting filter
  resetSearch() {
    this._setNewSearch('');
  }

  // Filter function (on find click)
  filter(value: string) {
    this._setNewSearch(value);
  }

  private _setNewSearch(value: string) {
    this._start = 0;
    this._search.next(value);
    this._start += this._COUNT;
  }

  // On Add more click
  increasePages() {
    if (this._length > this._start) {
      this._loadToStore(PUSH_LIST);
      this._start += this._COUNT;
    }
  }

  // Removing course from list
  removeItem(item: CourseItem): Observable<void> {
    return this._deleteFromServer(item.id).map(() => {
        this._start -= 1;
        this._length -= 1;
        this._store.dispatch({ type: DELETE_COURSE, payload: item });
      });
  }

  // Gettin info about course
  getItem(id: number): Observable<CourseItem> {
    return this._http.get(BASE_URL + '/courses/' + id)
                      .map((value: any) => CourseItem.toDTO(value));
  }

  filterOutdated() {
    const date = new Date();
    date.setDate(date.getDate() - 14);

    this._store.select('courses').subscribe((courses: CourseItem[]) => {
      this._store.dispatch({
        type: SET_LIST, payload: courses.filter((val: CourseItem) => {
          return val.date >= date;
        })
      });
    });
  }

  // Function to show, did we load everything from server
  isFullyLoaded(): boolean {
    return this._length <= this._start;
  }

  // Saving course to store
  saveCourseDispatch(course: CourseItem) {
    this._store.select('addEditCourse').dispatch({ type: SAVE_COURSE, payload: course });
  }

  // Dispatching action about cancelling saving
  cancelSavingDispatch() {
    this._store.select('addEditCourse').dispatch({ type: CANCEL_SAVING });
  }

  private _getListFromServer(pages: number = 0, query?: string, count = this._COUNT): Observable<CourseItem[]> {
    const params: { start: string, count: string, query?: string } = {
      start: pages + '',
      count: count + ''
    };
    if (query) {
      params.query = query;
    }
    return this._http.get<any>(BASE_URL + '/courses', {
      params: params
    }).map((coursesObj: { length: number, courses: any[] }) => {
        this._length = coursesObj.length;
        return coursesObj.courses.map((obj: any) => CourseItem.toDTO(obj));
      });
  }

  private _deleteFromServer(id: number): Observable<void> {
    return this._http.delete(BASE_URL + '/courses/' + id, {
      responseType: 'text'
    }).map(() => {});
  }

  private _createCourseOnServer(course: CourseItem): Observable<string> {
    return this._http.post(BASE_URL + '/courses', CourseItem.toServer(course), {
      responseType: 'text'
    });
  }

  private _updateCourseOnServer(course: CourseItem): Observable<void> {
    const body: any = CourseItem.toServer(course);
    body.id = course.id;

    return this._http.post(BASE_URL + '/courses/' + course.id, body, {
      responseType: 'text'
    }).map(() => { });
  }
}
