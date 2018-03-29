import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './course-details.component';
import { CourseDurationPipeModule } from '../../../../core/pipes/';

@NgModule({
  imports: [
    CommonModule,
    CourseDurationPipeModule
  ],
  declarations: [CourseDetailsComponent],
  exports: [CourseDetailsComponent]
})
export class CourseDetailsModule { }
