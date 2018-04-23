import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appAuthorValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AuthorValidatorDirective, multi: true }]
})
export class AuthorValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any; } {
    if (!control.value || control.value.length === 0) {
      return { 'invalidAuthors': true };
    }
    return null;
  }

  constructor() { }

}
