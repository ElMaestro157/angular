import { Author } from './author';
import { Course } from './interfaces';

export class CourseItem implements Course {

  constructor(
    public id: number,
    public title: string,
    public date: Date,
    public duration: number,
    public description: string,
    public topRated: boolean,
    public authors: Author[]
  ) {
    if (id && id < 0) {
      throw new Error('Invalid id found!');
    }

    if (!title) {
      throw new Error('Invalid title found!');
    }

    if (!date || isNaN(date.valueOf())) {
      throw new Error('Invalid date found!');
    }

    if (!duration || duration < 0) {
      throw new Error('Invalid duration found!');
    }

    if (!description) {
      throw new Error('Invalid description found!');
    }

    if (topRated === null) {
      throw new Error('Invalid topRated found!');
    }

    if (!authors || authors.length === 0) {
      throw new Error('Empty authors list found!');
    }
  }

  public static toDTO(val: any): CourseItem {
    return new CourseItem(+val.id,
      val.name, new Date(val.date),
      +val.length, val.description,
      !!val.isTopRated,
      val.authors.map((value: any) => Author.toDTO(value)));
  }

  public static toServer(course: CourseItem): any {
    return {
      // id: course.id,
      name: course.title,
      description: course.description,
      isTopRated: course.topRated,
      date: course.date.toDateString(),
      authors: course.authors.map((value: Author) => Author.toServer(value)),
      length: '' + course.duration,
    };
  }
}
