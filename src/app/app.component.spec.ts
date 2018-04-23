import { APP_BASE_HREF } from '@angular/common';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { reducers } from './app.redux';
import { FooterComponent, LogoComponent } from './core/components';
import { AddCourseModule, CoursesModule, LoginModule, NoContentModule } from './pages';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

describe('AppComponent', () => {
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        LogoComponent
      ],
      imports: [
        CoursesModule,
        LoginModule,
        NoContentModule,
        AddCourseModule,
        HttpModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should redirect empty path to login', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(router.url).toBe('/login');
  }));
});
