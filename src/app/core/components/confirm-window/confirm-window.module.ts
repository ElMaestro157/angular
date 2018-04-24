import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ConfirmWindowComponent } from './confirm-window.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ConfirmWindowComponent],
  exports: [ConfirmWindowComponent]
})
export class ConfirmWindowModule { }
