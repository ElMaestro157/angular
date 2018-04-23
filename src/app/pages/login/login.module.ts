import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderBlockModule } from '../../core/components';
import { LoginService } from '../../core/services';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderBlockModule
  ],
  providers: [LoginService],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }
