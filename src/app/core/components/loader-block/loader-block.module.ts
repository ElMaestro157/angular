import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderBlockComponent } from './loader-block.component';
import { LoaderBlockServiceService } from '../../services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderBlockComponent],
  exports: [LoaderBlockComponent],
  providers: [LoaderBlockServiceService]
})
export class LoaderBlockModule { }
