import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CourseDurationPipeModule } from '../../../../core/pipes/';
import { CourseDetailsComponent } from './course-details.component';

@NgModule({
  imports: [
    CommonModule,
    CourseDurationPipeModule
  ],
  declarations: [CourseDetailsComponent],
  exports: [CourseDetailsComponent]
})
export class CourseDetailsModule { }
