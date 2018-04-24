import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CourseItem } from '../../../../core/entities';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent {

  @Input() course: CourseItem;

  constructor() { }

}
