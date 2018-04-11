import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateService } from '../../core/services';

import { AuthorsModule, AuthorsService } from './authors';
import { CoursesService } from '../courses/courses-service';

import { AddCourseComponent } from './add-course.component';
import { DurationModule } from './duration';
import { DateModule } from './date';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsModule,
    DateModule,
    DurationModule,
  ],
  providers: [CanActivateService, CoursesService, AuthorsService],
  exports: [AddCourseComponent],
  declarations: [AddCourseComponent]
})
export class AddCourseModule { }
