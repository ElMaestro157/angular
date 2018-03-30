import { NoContentComponent } from './pages/no-content/no-content.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CanActivateService } from './core/services';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'courses', component: CoursesComponent, canActivate: [CanActivateService]},
  { path: 'courses/new', component: AddCourseComponent, pathMatch: 'full', canActivate: [CanActivateService] },
  { path: 'courses/:id', component: AddCourseComponent, canActivate: [CanActivateService]},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NoContentComponent },
  { path: '**', redirectTo: '/404' }
];
