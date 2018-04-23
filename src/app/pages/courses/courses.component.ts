import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CourseItem } from '../../core/entities';
import { LoaderBlockServiceService } from '../../core/services';
import { CoursesService } from './courses-service';

@Component({
  selector: 'app-courses',
  providers: [LoaderBlockServiceService],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {

  public courses: CourseItem[]; // Courses' list
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
    this._coursesService.removeItem(course).subscribe(() => {
      this._loaderService.hide();
    });
  }

  isEmpty(): boolean {
    return this.courses.length === 0;
  }

  isLoaded(): boolean {
    return this._coursesService.isFullyLoaded();
  }
}
