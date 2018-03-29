import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesOrderByPipe } from './courses-order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CoursesOrderByPipe],
  declarations: [CoursesOrderByPipe]
})
export class CoursesOrderByPipeModule { }
