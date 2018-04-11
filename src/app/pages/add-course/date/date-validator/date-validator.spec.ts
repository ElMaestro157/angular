import { FormControl } from '@angular/forms';
import { dateValidator } from '.';
import { Author } from '../../../../core/entities';

const mock = jasmine.createSpyObj('FormControl', ['toString']);
describe('DateValidator', () => {

  it('should return correct values', () => {
    mock.value = '18/01/2018';
    expect(dateValidator(mock)).toBeNull();

    mock.value = '';
    expect(dateValidator(mock)).toBeTruthy();

    mock.value = 'dasdsaffsfd';
    expect(dateValidator(mock)).toBeTruthy();
  });
});
