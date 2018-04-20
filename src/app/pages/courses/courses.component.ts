import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CoursesService } from './courses-service';
import { LoaderBlockServiceService } from '../../core/services';
import { CourseItem } from '../../core/entities';

@Component({
  selector: 'app-courses',
  providers: [LoaderBlockServiceService],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: CourseItem[]; // Courses' list
  private _subscriber: Subscription;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _coursesService: CoursesService,
              private _loaderService: LoaderBlockServiceService
            ) { }

  ngOnInit() {
    this._subscriber = this._coursesService.getList.subscribe((val) => {
      this.courses = val;
      this._changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }

  addMore() {
    this._coursesService.increasePages();
  }

  onItemDelete(course: CourseItem) {
    this._loaderService.show();
    setTimeout(() => {
      this._loaderService.hide();
    }, 0);
    this._coursesService.removeItem(course);
  }

  isEmpty(): boolean {
    return this.courses.length === 0;
  }

  isLoaded(): boolean {
    return this._coursesService.isFullyLoaded();
  }
}
