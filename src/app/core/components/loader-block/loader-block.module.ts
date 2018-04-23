import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderBlockComponent } from './loader-block.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderBlockComponent],
  exports: [LoaderBlockComponent]
})
export class LoaderBlockModule { }
