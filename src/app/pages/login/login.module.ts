import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoaderBlockModule } from '../../core/components';

import { LoginService } from '../../core/services';

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
