import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';

import { ToolboxModule } from './toolbox';
import { CourseModule } from './course';
import { LoaderBlockModule } from '../../core/components';
import { NoDataModule } from './no-data';

import { CoursesService } from './courses-service';

import { CoursesOrderByPipeModule } from './courses-order-by-pipe';


@NgModule({
  imports: [
    CommonModule,
    ToolboxModule,
    CourseModule,
    LoaderBlockModule,
    NoDataModule,
    CoursesOrderByPipeModule,
    HttpModule
  ],
  providers: [CoursesService, HttpModule],
  declarations: [CoursesComponent],
  exports: [CoursesComponent]
})
export class CoursesModule { }
