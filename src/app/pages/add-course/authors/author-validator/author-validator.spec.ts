import { FormControl } from '@angular/forms';
import { authorValidator } from '.';
import { Author } from '../../../../core/entities';

const mock = jasmine.createSpyObj('FormControl', ['toString']);
describe('AuthorValidator', () => {

  it('should return correct values', () => {
    mock.value = [new Author(1, 'first', 'last')];
    expect(authorValidator(mock)).toBeNull();

    mock.value = [];
    expect(authorValidator(mock)).toBeTruthy();

    mock.value = null;
    expect(authorValidator(mock)).toBeTruthy();
  });
});
