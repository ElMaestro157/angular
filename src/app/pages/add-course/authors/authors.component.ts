import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthorsComponent),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent implements OnInit, ControlValueAccessor {

  selectedAuthors: string[] = [];
  @Input() authors: Observable<any[]>;
  allAuthors: string[] = [];

  selected = [0, 0];

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.authors.subscribe((authors) => {
      this.allAuthors = authors.map((val) => `${val['firstName']} ${val['lastName']}`);
      this.changeDetector.markForCheck();
    });
    console.log(this.allAuthors, this.selectedAuthors);
  }

  get value(): string[] {
    return this.selectedAuthors;
  }

  onClick(ind: number) {
    const numb = this.selected[ind];
    const temp = !ind ? this.selectedAuthors[numb] : this.allAuthors[numb];
    if (!ind) {
      this.selectedAuthors.splice(numb, 1);
      this.allAuthors.push(temp);
    } else {
      this.allAuthors.splice(numb, 1);
      this.selectedAuthors.push(temp);
    }
    this.selected[ind] = 0;
  }

  onChange = (_) => { };
  onTouch = () => { };

  writeValue(obj: string[]): void {
    this.selectedAuthors = obj;
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
