import { Pipe, PipeTransform } from '@angular/core';

import { CourseItem } from './../../../core/entities';

@Pipe({
  name: 'coursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {

  transform(value: CourseItem[]): CourseItem[] {
    value.sort((a: CourseItem, b: CourseItem) => {
      return a.date.valueOf() - b.date.valueOf();
    });
    return value;
  }

}
