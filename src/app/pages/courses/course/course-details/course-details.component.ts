import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../../../../core/entities';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent {

  @Input() course: CourseItem;

  constructor() { }

}
