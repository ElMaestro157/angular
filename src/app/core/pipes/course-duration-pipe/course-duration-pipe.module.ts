import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDurationPipe } from './course-duration.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CourseDurationPipe],
  declarations: [CourseDurationPipe]
})
export class CourseDurationPipeModule { }
