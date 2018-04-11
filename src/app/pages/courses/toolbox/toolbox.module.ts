import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolboxComponent } from './toolbox.component';
import { CoursesService } from '../courses-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [CoursesService],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
