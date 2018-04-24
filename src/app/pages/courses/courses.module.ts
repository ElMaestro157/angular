import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanActivateService } from '../../core/services';
import { CourseModule } from './course';
import { CoursesOrderByPipe } from './courses-order-by-pipe';
import { CoursesService } from './courses-service';
import { CoursesComponent } from './courses.component';
import { NoDataComponent } from './no-data';
import { ToolboxModule } from './toolbox';

@NgModule({
  imports: [
    CommonModule,
    ToolboxModule,
    CourseModule
  ],
  providers: [CanActivateService, CoursesService],
  declarations: [
    CoursesComponent,
    CoursesOrderByPipe,
    NoDataComponent
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
