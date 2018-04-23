import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanActivateService } from '../../core/services';
import { CoursesService } from '../courses/courses-service';
import { AddCourseComponent } from './add-course.component';
import { AuthorsService } from './authors';
import { DateComponent } from './date';
import { DurationModule } from './duration';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent, DateComponent ],
      imports: [
        DurationModule
      ],
      providers: [CanActivateService, CoursesService, AuthorsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
