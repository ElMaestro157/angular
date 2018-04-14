import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppState } from '../../app.redux';
import { SAVE_COURSE, CANCEL_SAVING } from './add-course-reducer';

import { AuthorsService, authorValidator } from './authors';
import { CoursesService } from './../courses/courses-service';
import { CourseItem } from './../../core/entities';
import { dateValidator } from './date';
import { durationValidator } from './duration';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseComponent implements OnInit {

  private id: number = null; // If course exists (clicked edit course)
  private isTopRated: boolean = null; // If course exists (clicked edit course)
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public authorsServ: AuthorsService,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((val) => {
      if (val.id) {
        this.courseService.getItem(+val.id).subscribe((course) => {
          const month = course.date.getMonth() + 1;
          const day = course.date.getDate();
          this.formGroup.setValue({
            title: course.title,
            description: course.description,
            date: `${day < 10 ? '0' + day : day + ''}/${month < 10 ? '0' + month : month + ''}/${course.date.getFullYear()}`,
            duration: course.duration,
            authors: course.authors
          });
          this.id = course.id;
          this.isTopRated = course.topRated;
          this.changeDetector.markForCheck();
        });
      }
    });
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      date: new FormControl('', [dateValidator, Validators.required]),
      duration: new FormControl('', [durationValidator, Validators.required, Validators.maxLength(3)]),
      authors: new FormControl([], [authorValidator])
    });
  }

  save() {
    const dateArr = this.formGroup.value.date.split('/');
    const course = new CourseItem(
      this.id,
      this.formGroup.value.title,
      new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]),
      +this.formGroup.value.duration,
      this.formGroup.value.description,
      !!this.isTopRated,
      this.formGroup.value.authors);
    this.store.select('addEditCourse').dispatch({ type: SAVE_COURSE, payload: course });
    this.courseService.resetSearch();
    this.router.navigateByUrl('courses');
  }

  cancel() {
    this.store.select('addEditCourse').dispatch({ type: CANCEL_SAVING });
    this.courseService.resetSearch();
    this.router.navigateByUrl('courses');
  }
}
