import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoaderBlockModule } from '../../core/components';

import { LoginService } from '../../core/services';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderBlockModule,
    HttpModule
  ],
  providers: [LoginService, HttpModule],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }
