import { CoursesService } from './../courses/courses-service';
import { CourseItem } from './../../core/entities';
import { AuthorsService } from './authors/authors-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { dateValidator } from './date';
import { durationValidator } from './duration';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {

  formGroup: FormGroup;
  authors: string[];

  constructor(private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public authorsServ: AuthorsService,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((val) => {
      if (val.id) {
        this.courseService.getItem(+val.id).subscribe((value) => {
          const course = value;
          this.authorsServ.getAuthors(course).subscribe((authors) => {
            const month = course.date.getMonth() + 1;
            const day = course.date.getDate() + 1;
            this.formGroup.setValue({
              title: course.title,
              description: course.description,
              date: `${day < 10 ? '0' + day : day + ''}/${month < 10 ? '0' + month : month + ''}/${course.date.getFullYear()}`,
              duration: course.duration,
              authors: authors.map((author) => `${author['firstName']} ${author['lastName']}`)
            });
            this.changeDetector.markForCheck();
          });
        });
      }
    });
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      date: new FormControl('', [dateValidator, Validators.required]),
      duration: new FormControl('', [durationValidator, Validators.required, Validators.maxLength(3)]),
      authors: new FormControl([])
    });
  }

  save() {
    console.log(this.formGroup.value);
    this.router.navigateByUrl('courses');
  }

  cancel() {
    this.router.navigateByUrl('courses');
  }

}
