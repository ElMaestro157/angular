import { FormControl } from '@angular/forms';

export function durationValidator(control: FormControl): { [key: string]: any; } {
  const duration = +control.value;
  if (!isNaN(duration) && duration > 0) {
    return null;
  }
  return { 'durationInvalid': true };
}
