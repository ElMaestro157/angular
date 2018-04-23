import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoContentComponent } from './no-content.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [NoContentComponent],
  declarations: [NoContentComponent]
})
export class NoContentModule { }
