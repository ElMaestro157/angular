import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from '../../../core/entities';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  @Input() course: CourseItem;

  @Output() deleteEvent = new EventEmitter<CourseItem>();

  constructor(private _router: Router) { }

  delete() {
    if (confirm('Are you sure to delete this item?')) {
      this.deleteEvent.emit(this.course);
    }
  }

  edit() {
    this._router.navigate(['/courses', this.course.id]);
  }

}
