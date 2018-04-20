import { FormGroup, NgControl, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DurationComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationComponent implements OnInit, ControlValueAccessor {

  formGroup: FormGroup;
  ngControl: NgControl;

  constructor(private _inj: Injector, private _changeDetector: ChangeDetectorRef) {
    this.formGroup = new FormGroup({
      duration: new FormControl('')
    });

    this.formGroup.valueChanges.subscribe(data => {
      this.onChange(this.value);
      this._changeDetector.markForCheck();
    });
  }

  get value() {
    return this.formGroup.get('duration').value;
  }

  ngOnInit() {
    this.ngControl = this._inj.get(NgControl);
  }

  onChange = (_: any) => { };
  onTouch = () => { };

  writeValue(obj: string): void {
    this.formGroup.get('duration').setValue(obj);
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.controls.duration.enable()
      : this.formGroup.controls.duration.disable();
  }

}
