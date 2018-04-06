import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course.component';
import { AuthorsModule, AuthorsService } from './authors';
import { DurationModule } from './duration';
import { DateModule } from './date';
import { CoursesService } from '../courses/courses-service';
import { CanActivateService } from '../../core/services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsModule,
    DurationModule,
    DateModule
  ],
  providers: [CanActivateService, CoursesService, AuthorsService],
  exports: [AddCourseComponent],
  declarations: [AddCourseComponent]
})
export class AddCourseModule { }
