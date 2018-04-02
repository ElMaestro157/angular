import { FormControl } from '@angular/forms';

export function authorValidator(control: FormControl): { [key: string]: any; } {
  if (!control.value || control.value.length === 0) {
    return { 'invalidAuthors': true };
  }
  return null;
}
