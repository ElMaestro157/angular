import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CourseItem } from '../../core/entities';
import { CoursesService } from './courses-service';
import { LoaderBlockServiceService } from '../../core/services';

@Component({
  selector: 'app-courses',
  providers: [LoaderBlockServiceService],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: CourseItem[];
  private subscriber: Subscription;

  constructor(private changeDetector: ChangeDetectorRef,
    private coursesService: CoursesService, private loaderService: LoaderBlockServiceService) {

  }

  ngOnInit() {
    this.subscriber = this.coursesService.getList.subscribe((val) => {
      this.courses = val;
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  addMore() {
    this.coursesService.increasePages();
  }

  onItemDelete(course: CourseItem) {
    this.loaderService.show();
    this.coursesService.removeItem(course);
    setTimeout(() => {
      this.loaderService.hide();
    }, 0);
  }

  isEmpty() {
    return this.courses.length === 0;
  }
}
