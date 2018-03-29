import { CourseItem } from './../../../core/entities';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {

  transform(value: CourseItem[]): CourseItem[] {
    value.sort((a, b) => {
      return a.date.valueOf() - b.date.valueOf();
    });
    return value;
  }

}
