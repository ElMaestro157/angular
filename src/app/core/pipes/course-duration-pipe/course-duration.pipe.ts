import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseDuration'
})
export class CourseDurationPipe implements PipeTransform {

  transform(value: number): string {
    let answer = '';
    if (value > 0) {
      const minutes = value % 60;
      const hours = Math.floor(value / 60);
      answer += hours !== 0 ? hours + ' h' : '';
      answer += minutes !== 0 ? (hours !== 0 ? ' ' : '') + minutes + ' min' : '';
    }
    return answer;
  }

}
