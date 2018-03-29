import { CourseDateDirective } from './course.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CourseDateDirective],
  declarations: [CourseDateDirective]
})
export class CourseDirectiveModule { }
