import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateValidatorDirective } from './date-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateValidatorDirective],
  exports: [DateValidatorDirective]
})
export class DateValidatorModule { }
