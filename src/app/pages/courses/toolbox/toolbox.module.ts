import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoursesService } from '../courses-service';
import { ToolboxComponent } from './toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [CoursesService],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
