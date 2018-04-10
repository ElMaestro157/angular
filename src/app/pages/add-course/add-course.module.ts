import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorsModule, AuthorsService } from './authors';

import { AddCourseComponent } from './add-course.component';
import { DurationModule } from './duration';
import { DateModule } from './date';
import { CoursesService } from '../courses/courses-service';
import { CanActivateService } from '../../core/services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsModule,
    DateModule,
    DurationModule,
    DurationModule,
  ],
  providers: [CanActivateService, CoursesService, AuthorsService],
  exports: [AddCourseComponent],
  declarations: [AddCourseComponent]
})
export class AddCourseModule { }
