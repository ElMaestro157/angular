import { Router } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses-service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {

  value = '';

  constructor(private _router: Router, private _courseService: CoursesService) {
  }

  onClick() {
    this._courseService.filter(this.value);
  }

  createCourse() {
    this._router.navigate(['courses', 'new']);
  }

}
