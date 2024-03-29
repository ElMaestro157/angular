import { ActionReducerMap } from '@ngrx/store';

import { CourseItem, User } from './core/entities';
import { reducer as loginReducer } from './core/services/login-service/login-service-reducer';
import { reducer as addCourseReducer } from './pages/add-course/add-course-reducer';
import { reducer as coursesReducer } from './pages/courses/courses-redux-reducer';

export interface AppState {
  user: User;
  courses: CourseItem[];
  addEditCourse: CourseItem;
}

export const reducers: ActionReducerMap<AppState> = {
  user: loginReducer,
  courses: coursesReducer,
  addEditCourse: addCourseReducer
};
