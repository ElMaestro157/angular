import { FormControl } from '@angular/forms';

export function dateValidator(control: FormControl): { [key: string]: any; } {
  const validDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!control.value.match(validDatePattern)) {
    return { 'invalidDate': true };
  }
  return null;
}
