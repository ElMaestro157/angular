import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appDurationValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DurationValidatorDirective, multi: true }]
})
export class DurationValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any; } {
    const duration: number = +control.value;
    if (!isNaN(duration) && duration > 0) {
      return null;
    }
    return { 'durationInvalid': true };
  }

  constructor() { }

}
