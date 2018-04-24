import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CourseDetailsModule } from './course-details';
import { CourseDateDirective } from './course-directive';
import { CourseComponent } from './course.component';


@NgModule({
  imports: [
    CommonModule,
    CourseDetailsModule
  ],
  declarations: [
    CourseComponent,
    CourseDateDirective
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
