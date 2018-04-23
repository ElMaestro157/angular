import { Routes } from '@angular/router';

import { CanActivateService } from './core/services';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { NoContentComponent } from './pages/no-content/no-content.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'courses', component: CoursesComponent, canActivate: [CanActivateService]},
  { path: 'courses/new', component: AddCourseComponent, pathMatch: 'full', canActivate: [CanActivateService] },
  { path: 'courses/:id', component: AddCourseComponent, canActivate: [CanActivateService]},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NoContentComponent },
  { path: '**', redirectTo: '/404' }
];
