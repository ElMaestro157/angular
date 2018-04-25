import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from '../../../core/entities';
import { ConfirmWindowService } from '../../../core/services';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  @Input() course: CourseItem;

  @Output() deleteEvent = new EventEmitter<CourseItem>();

  constructor(private _router: Router, private _windowService: ConfirmWindowService) { }

  delete() {
    this._windowService.isAgreed.subscribe((val: boolean) => {
      this._windowService.hide();
      if (val) {
        this.deleteEvent.emit(this.course);
      }
    });
    this._windowService.show('Are you sure to delete item?');
  }

  edit() {
    this._router.navigate(['/courses', this.course.id]);
  }

}
