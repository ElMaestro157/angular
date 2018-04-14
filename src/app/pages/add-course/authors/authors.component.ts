import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Author } from '../../../core/entities';

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
export class AuthorsComponent implements OnInit, OnDestroy, ControlValueAccessor {

  selectedAuthors: Author[] = [];
  @Input() authors: Observable<Author[]>;
  allAuthors: Author[] = [];

  private subscriber: Subscription;

  selected = [0, 0]; // First - selected index for selected, second - for all authors' lists

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subscriber = this.authors.subscribe((authors) => {
      if (this.value !== []) {
        const selectedAuthSet = new Set(this.selectedAuthors.map((elem) => elem.getId));
        this.allAuthors = authors.filter((elem) => !selectedAuthSet.has(elem.getId));
      } else {
        this.allAuthors = authors;
      }
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  get value(): Author[] {
    return this.selectedAuthors;
  }

  onClick(ind: number) {
    this.onTouch();
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
    this.onChange(this.selectedAuthors);
  }

  onChange = (_) => { };
  onTouch = () => { };

  writeValue(obj: Author[]): void {
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
