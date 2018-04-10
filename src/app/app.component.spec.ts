import { HttpModule } from '@angular/http';
import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, NoContentModule, AddCourseModule } from './pages';
import { LogoModule, FooterModule } from './core/components';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.redux';

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
        AppComponent
      ],
      imports: [
        LogoModule,
        CoursesModule,
        FooterModule,
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
