import { CourseDurationPipe } from './course-duration.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CourseDurationPipe],
  declarations: [CourseDurationPipe]
})
export class CourseDurationPipeModule { }
