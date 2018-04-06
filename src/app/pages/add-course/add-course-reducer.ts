import { ActionReducer, Action } from '@ngrx/store';
import { CourseItem } from '../../core/entities';

export const SAVE_COURSE = '[ADD-EDIT] Save course';
export const CANCEL_SAVING = '[ADD-EDIT] Cancel saving';

class AddEditCourseAction implements Action {
  type: string;

  constructor(public payload?: CourseItem) { }
}

const initialState: CourseItem = {
  id: null,
  title: null,
  date: null,
  duration: null,
  description: null,
  topRated: null,
  authors: null
};

export const reducer: ActionReducer<CourseItem, AddEditCourseAction> = (state = initialState, action: AddEditCourseAction): CourseItem => {
  switch (action.type) {
    case SAVE_COURSE:
      return action.payload;
    case CANCEL_SAVING:
      return state;
    default:
      return state;
  }
};
