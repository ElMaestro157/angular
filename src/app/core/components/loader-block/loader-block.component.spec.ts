import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlockComponent } from './loader-block.component';

describe('LoaderBlockComponent', () => {
  let component: LoaderBlockComponent;
  let fixture: ComponentFixture<LoaderBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
