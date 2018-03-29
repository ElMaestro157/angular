import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationComponent } from './duration.component';
import { CourseDurationPipeModule } from '../../../core/pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CourseDurationPipeModule
  ],
  exports: [DurationComponent],
  declarations: [DurationComponent]
})
export class DurationModule { }
