import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course.component';
import { AuthorsModule, AuthorsService } from './authors';
import { DurationModule } from './duration';
import { DateModule } from './date';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsModule,
    DurationModule,
    DateModule,
    HttpModule
  ],
  providers: [AuthorsService, HttpModule],
  exports: [AddCourseComponent],
  declarations: [AddCourseComponent]
})
export class AddCourseModule { }
