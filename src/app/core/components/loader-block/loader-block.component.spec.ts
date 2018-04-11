import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlockComponent } from './loader-block.component';
import { LoaderBlockServiceService, LoaderBlockServiceMock } from '../../services';

describe('LoaderBlockComponent', () => {
  let component: LoaderBlockComponent;
  let fixture: ComponentFixture<LoaderBlockComponent>;
  let mock: LoaderBlockServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderBlockComponent ],
      providers: [
        { provide: LoaderBlockServiceService, useClass: LoaderBlockServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlockComponent);
    mock = TestBed.get(LoaderBlockServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide loader at service changes', () => {
    mock.setShow(false);
    fixture.detectChanges();
    let el = fixture.nativeElement.querySelector('div');
    expect(el).toBeNull();

    mock.setShow(true);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('div');
    expect(el.innerText).toContain('Loading...');
  });
});
