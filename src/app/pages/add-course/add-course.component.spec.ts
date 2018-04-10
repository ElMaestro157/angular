import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { DurationModule } from './duration';
import { DateModule } from './date';
import { CanActivateService } from '../../core/services';
import { CoursesService } from '../courses/courses-service';
import { AuthorsService } from './authors';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ],
      imports: [
        DurationModule,
        DateModule
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
