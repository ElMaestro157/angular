import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../../../core/entities';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: CourseItem;

  @Output() deleteEvent = new EventEmitter<CourseItem>();

  constructor() { }

  delete() {
    if (confirm('Are you sure to delete this item?')) {
      this.deleteEvent.emit(this.course);
    }
  }

  ngOnInit() {
  }

}
