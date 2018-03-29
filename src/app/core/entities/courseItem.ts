import { Course } from './course';

export class CourseItem implements Course {

  constructor(
    public id: number,
    public title: string,
    public date: Date,
    public duration: number,
    public description: string,
    public topRated: boolean
  ) {  }
}
