import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseItem } from './../../core/entities';
import { CoursesService } from './../courses/courses-service';
import { AuthorsService } from './authors';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseComponent implements OnInit {

  private _id: number = null; // If course exists (clicked edit course)
  private _isTopRated: boolean = null; // If course exists (clicked edit course)
  public formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _changeDetector: ChangeDetectorRef,
    public authorsServ: AuthorsService,
    private _courseService: CoursesService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((val) => {
      // If clicked edit course button
      if (val.id) {
        this._courseService.getItem(+val.id).subscribe((course) => {
          const month = course.date.getMonth() + 1;
          const day = course.date.getDate();
          this.formGroup.setValue({
            title: course.title,
            description: course.description,
            date: `${day < 10 ? '0' + day : day + ''}/${month < 10 ? '0' + month : month + ''}/${course.date.getFullYear()}`,
            duration: course.duration,
            authors: course.authors
          });
          this._id = course.id;
          this._isTopRated = course.topRated;
          this._changeDetector.markForCheck();
        });
      }
    });
    this.formGroup = this._formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      date: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      authors: new FormControl([])
    });
  }

  save() {
    const dateArr = this.formGroup.value.date.split('/');
    const course = new CourseItem(
      this._id,
      this.formGroup.value.title,
      new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]),
      +this.formGroup.value.duration,
      this.formGroup.value.description,
      !!this._isTopRated,
      this.formGroup.value.authors);
    this._courseService.saveCourseDispatch(course);
    this._courseService.resetSearch();
    this._router.navigateByUrl('courses');
  }

  cancel() {
    this._courseService.cancelSavingDispatch();
    this._courseService.resetSearch();
    this._router.navigateByUrl('courses');
  }
}
