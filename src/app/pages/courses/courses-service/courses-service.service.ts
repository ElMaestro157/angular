import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CourseItem } from './../../../core/entities';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/skip';

@Injectable()
export class CoursesService {

  public courselist: BehaviorSubject<CourseItem[]> = new BehaviorSubject([]);
  private baseURL = 'http://localhost:3004';
  private pages = new BehaviorSubject<number>(1);
  private search = new BehaviorSubject<string>(null);

  constructor(private http: Http) {
  }

  get getList(): Observable<CourseItem[]> {
    this.pages.subscribe((val) => {
      this.getListFromServer(val).subscribe((courses) => {
        this.courselist.next(courses);
      });
    });

    this.search.skip(1).subscribe((val) => {
      this.getListFromServer(0, val).subscribe((courses) => {
        this.courselist.next(courses);
      });
    });

    return this.courselist.asObservable();
  }

  increasePages() {
    this.pages.next(this.pages.value + 1);
  }

  private getListFromServer(pages: number = 0, query?: string): Observable<CourseItem[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/courses';
    requestOptions.params = new URLSearchParams();
    requestOptions.params.set('start', '0');
    if (pages) {
      requestOptions.params.set('count', pages * 10 + '');
    }
    if (query) {
      requestOptions.params.set('query', query);
    }

    const request = new Request(requestOptions);
    return this.http.request(request)
              .map((res) => res.json())
              .map((coursesObj) => {
                return this.map(coursesObj);
              });
  }

  private deleteFromServer(id: number): Observable<CourseItem[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Get;
    requestOptions.url = this.baseURL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res) => res.json())
      .map((coursesObj) => {
        return this.map(coursesObj);
      });
  }

  createCourse(id: number, title: string, date: Date, duration: number, description: string, topRated: boolean): CourseItem {
    const tempDate = new Date();
    tempDate.setDate(date.getDate() - 14);

    if (date >= tempDate) {
      const course = new CourseItem(id, title, date, duration, description, topRated);
      const newCourseList = this.courselist.value.splice(-1, 0, course);
      this.courselist.next(newCourseList);
      return course;
    }

    return null;
  }

  getItem(id: number): CourseItem {
    return this.courselist.value.find((elem) => elem.id === id || null);
  }

  updateItem(id: number) {

  }// don't understand

  removeItem(item: CourseItem) {
    this.deleteFromServer(item.id).subscribe((courses) => {
      this.courselist.next(courses);
    });
  }

  filter(value: string) {
    if (value) {
      this.search.next(value);
    } else {
      this.pages.next(this.pages.value);
    }
  }

  filterOutdated() {
    const date = new Date();
    date.setDate(date.getDate() - 14);

    this.courselist.next(
      this.courselist.value.filter((val) => {
        return val.date >= date;
      })
    );
  }

  private map(coursesFromServer: any[]): CourseItem[] {
    return coursesFromServer.map((val) => {
      return new CourseItem(val.id, val.name, val.date, val.length, val.description, val.isTopRated);
    });
  }

}
