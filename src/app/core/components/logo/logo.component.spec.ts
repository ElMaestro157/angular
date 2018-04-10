import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES } from '../../../app.routes';

import { LogoComponent } from './logo.component';
import { FooterModule } from '..';
import { CoursesModule, AddCourseModule, LoginModule, NoContentModule } from '../../../pages';

import { LoginServiceMock } from '../mocks';
import { LoginService } from '../../services';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let router: Router;
  let mock: LoginServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoComponent ],
      imports: [
        CoursesModule,
        FooterModule,
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
