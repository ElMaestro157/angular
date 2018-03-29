import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses-service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {

  value = '';

  constructor(private courseService: CoursesService) {
  }

  ngOnInit() {
  }

  onClick() {
    this.courseService.filter(this.value);
  }
}