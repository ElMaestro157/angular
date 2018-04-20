import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateService } from '../../core/services';

import { AuthorsModule, AuthorsService, AuthorValidatorModule } from './authors';
import { CoursesService } from '../courses/courses-service';

import { AddCourseComponent } from './add-course.component';
import { DurationModule, DurationValidatorModule } from './duration';
import { DateModule, DateValidatorModule } from './date';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsModule,
    AuthorValidatorModule,
    DateModule,
    DateValidatorModule,
    DurationModule,
    DurationValidatorModule
  ],
  providers: [CanActivateService, CoursesService, AuthorsService],
  exports: [AddCourseComponent],
  declarations: [AddCourseComponent]
})
export class AddCourseModule { }
