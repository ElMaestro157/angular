import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from '../courses-service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {

  public value = '';

  constructor(private _router: Router, private _courseService: CoursesService) {
  }

  onClick() {
    this._courseService.filter(this.value);
  }
}
