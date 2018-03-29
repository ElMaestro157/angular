import { CourseDirectiveModule } from './course-directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CourseDetailsModule } from './course-details';

@NgModule({
  imports: [
    CommonModule,
    CourseDetailsModule,
    CourseDirectiveModule
  ],
  declarations: [CourseComponent],
  exports: [CourseComponent]
})
export class CourseModule { }
