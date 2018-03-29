import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox.component';
import { CoursesService } from '../courses-service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [CoursesService, HttpModule],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
