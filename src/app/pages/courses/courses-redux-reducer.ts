import { ActionReducer, Action } from '@ngrx/store';
import { CourseItem } from '../../core/entities';

export const SET_LIST = '[COURSES] Set courses list';
export const DELETE_COURSE = '[COURSES] Delete course from list';
export const EDIT_COURSE = '[COURSES] Edit course';
export const ADD_COURSE = '[COURSES] Add new course';

class CoursesAction implements Action {
  type: string;

  constructor(public payload: any) { }
}

class SetCoursesAction extends CoursesAction {
  type = SET_LIST;

  constructor (public payload: CourseItem[]) { super(payload); }
}

class AddEditDeleteCourseAction extends CoursesAction {
  type: string;

  constructor(public payload: CourseItem) { super(payload); }
}

export const reducer: ActionReducer<CourseItem[], CoursesAction> = (state = [], action: CoursesAction): CourseItem[] => {
  switch (action.type) {
    case SET_LIST:
      return action.payload;

    case DELETE_COURSE:
      let course = state.find(val => val.id === action.payload.id );
      state.splice(state.indexOf(course), 1);
      return state.slice();

    case EDIT_COURSE:
      course = state.find(val => val.id === action.payload.id);
      state[state.indexOf(course)] = action.payload;
      return state.slice();

    case ADD_COURSE:
      state.push(action.payload);
      return state.slice();

    default:
      return state;
  }
};
