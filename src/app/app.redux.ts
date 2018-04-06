import { ActionReducerMap } from '@ngrx/store';
import { reducer as addCourseReducer } from './pages/add-course/add-course-reducer';
import { reducer as coursesReducer } from './pages/courses/courses-redux-reducer';
import { LoginStore, reducer as loginReducer } from './core/services/login-service/login-service-reducer';

import { CourseItem } from './core/entities';

export interface AppState {
  login: LoginStore;
  courses: CourseItem[];
  addEditCourse: CourseItem;
}

export const reducers: ActionReducerMap<AppState> = {
  login: loginReducer,
  courses: coursesReducer,
  addEditCourse: addCourseReducer
};
