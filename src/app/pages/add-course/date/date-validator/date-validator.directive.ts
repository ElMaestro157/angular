import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true }]
})
export class DateValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any; } {
    const validDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    if (!control.value.match(validDatePattern)) {
      return { 'invalidDate': true };
    }
    return null;
  }

  constructor() { }

}
