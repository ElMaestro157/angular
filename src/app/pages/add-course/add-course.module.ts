import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CanActivateService } from '../../core/services';
import { CoursesService } from '../courses/courses-service';
import { AddCourseComponent } from './add-course.component';
import { AuthorsComponent, AuthorsService, AuthorValidatorDirective } from './authors';
import { DateComponent, DateValidatorDirective } from './date';
import { DurationModule, DurationValidatorDirective } from './duration';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DurationModule,
  ],
  providers: [CanActivateService, CoursesService, AuthorsService],
  exports: [AddCourseComponent],
  declarations: [
    AddCourseComponent,
    AuthorValidatorDirective,
    AuthorsComponent,
    DurationValidatorDirective,
    DateValidatorDirective,
    DateComponent
  ]
})
export class AddCourseModule { }
