import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { LoginService } from '../../services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [LoginService],
  declarations: [LogoComponent],
  exports: [LogoComponent]
})
export class LogoModule { }
