import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolboxModule } from './toolbox';
import { CourseModule } from './course';
import { LoaderBlockModule } from '../../core/components';
import { NoDataModule } from './no-data';

import { CoursesService } from './courses-service';
import { CanActivateService } from '../../core/services';

import { CoursesOrderByPipeModule } from './courses-order-by-pipe';
import { CoursesComponent } from './courses.component';

@NgModule({
  imports: [
    CommonModule,
    ToolboxModule,
    CourseModule,
    LoaderBlockModule,
    NoDataModule,
    CoursesOrderByPipeModule
  ],
  providers: [CanActivateService, CoursesService],
  declarations: [CoursesComponent],
  exports: [CoursesComponent]
})
export class CoursesModule { }
