import { Http, Response, RequestOptions, RequestMethod, Request, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CourseItem, Author } from './../../../core/entities';
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
                return Array.from(coursesObj).map((obj) => this.map(obj));
              });
  }

  private deleteFromServer(id: number): Observable<CourseItem[]> {
    const requestOptions = new RequestOptions();
    requestOptions.method = RequestMethod.Delete;
    requestOptions.url = this.baseURL + '/courses/' + id;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .map((res) => res.json())
      .map((coursesObj) => {
        return Array.from(coursesObj).map((obj) => this.map(obj));
      });
  }

  private createUpdateCourseFromServer(course: CourseItem): Observable<CourseItem[]> {
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
      .map((res) => res.json())
      .map((coursesObj) => {
        return Array.from(coursesObj).map((obj) => this.map(obj));
      });
  }

  createUpdateCourse(course: CourseItem) {
    // const tempDate = new Date();
    // tempDate.setDate(date.getDate() - 14);

    this.createUpdateCourseFromServer(course).subscribe((courses) => {
      this.courselist.next(courses);
    });

    // if (course.date >= tempDate) {
    //   const newCourseList = this.courselist.value.splice(-1, 0, course);
    //   this.courselist.next(newCourseList);
    //   return course;
    // }
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
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName
      };
    });
  }

}
