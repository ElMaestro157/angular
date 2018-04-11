import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthorsComponent],
  exports: [AuthorsComponent]
})
export class AuthorsModule { }
