import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CourseDurationPipeModule } from '../../../core/pipes';
import { DurationComponent } from './duration.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CourseDurationPipeModule
  ],
  exports: [DurationComponent],
  declarations: [DurationComponent]
})
export class DurationModule { }
