import { Component, forwardRef, OnInit, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent implements OnInit, ControlValueAccessor {

  formGroup: FormGroup;
  ngControl: NgControl;

  constructor(private inj: Injector, private changeDetector: ChangeDetectorRef) {
    this.formGroup = new FormGroup({
      date: new FormControl('')
    });
    this.formGroup.valueChanges.subscribe(data => {
      this.onChange(this.value);
      this.changeDetector.markForCheck();
    });
  }

  get value(): string {
    return this.formGroup.get('date').value;
  }

  get touched(): boolean {
    return this.formGroup.get('date').touched;
  }

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl);
  }

  onChange = (_: any) => { };
  onTouch = () => { };

  writeValue(obj: string): void {
    this.formGroup.get('date').setValue(obj);
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.controls.date.enable()
      : this.formGroup.controls.date.disable();
  }
}
