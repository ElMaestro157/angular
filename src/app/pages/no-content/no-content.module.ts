import { NoContentComponent } from './no-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [NoContentComponent],
  declarations: [NoContentComponent]
})
export class NoContentModule { }
