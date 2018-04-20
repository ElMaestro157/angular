import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationValidatorDirective } from './duration-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DurationValidatorDirective],
  exports: [DurationValidatorDirective]
})
export class DurationValidatorModule { }
