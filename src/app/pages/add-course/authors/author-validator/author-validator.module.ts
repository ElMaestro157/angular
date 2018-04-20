import { AuthorValidatorDirective } from './author-validator.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthorValidatorDirective],
  exports: [AuthorValidatorDirective]
})
export class AuthorValidatorModule { }
