import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../../../../core/entities';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent implements OnInit {

  @Input() course: CourseItem;

  constructor() { }

  ngOnInit() {
  }

}
