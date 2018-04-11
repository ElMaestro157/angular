import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDateDirective } from './course.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CourseDateDirective],
  declarations: [CourseDateDirective]
})
export class CourseDirectiveModule { }
