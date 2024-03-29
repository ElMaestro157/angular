import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoaderBlockComponent } from './loader-block.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [LoaderBlockComponent],
  exports: [LoaderBlockComponent]
})
export class LoaderBlockModule { }
