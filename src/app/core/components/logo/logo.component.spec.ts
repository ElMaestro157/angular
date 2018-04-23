import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FooterComponent } from '..';
import { ROUTES } from '../../../app.routes';
import { AddCourseModule, CoursesModule, LoginModule, NoContentModule } from '../../../pages';
import { LoginService, LoginServiceMock } from '../../services';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let router: Router;
  let mock: LoginServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoComponent, FooterComponent ],
      imports: [
        CoursesModule,
        LoginModule,
        NoContentModule,
        AddCourseModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LoginService, useClass: LoginServiceMock }
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mock = TestBed.get(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide user/logoff block', () => {
    mock.setName(null);
    fixture.detectChanges();
    let el = fixture.nativeElement.querySelector('div.user-logoff');
    expect(el).toBeNull();

    mock.setName('someName');
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('div.user-logoff');
    expect(el.childElementCount).toBe(2);
  });

  it('should show and store real login', () => {
    mock.setName('someName');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div.user-logoff > div:first-child');
    expect(el.innerText).toBe('someName');
    component.getUserName().subscribe(value => expect(value).toBe('someName'));
  });

  // it('should navigate to root breadcrumb on click', fakeAsync(() => {
  //   router.navigate(['courses', 'abracadabra']);
  //   tick();
  //   const url = router.url.split('/')[1].toUpperCase();
  //   expect(component.logo).toBe(url);
  //   component.breadCrumbClick();
  //   expect(router.url).toBe(`/${url.toLowerCase()}`);
  // }));
});
