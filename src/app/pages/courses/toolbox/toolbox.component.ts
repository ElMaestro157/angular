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

  constructor(private router: Router, private courseService: CoursesService) {
  }

  onClick() {
    this.courseService.filter(this.value);
  }

  createCourse() {
    this.router.navigate(['courses', 'new']);
  }

}
