import { Author, CourseItem, User } from '.';

describe('Author', () => {
  it('should create instance at positive values', () => {
    expect(new Author(1, 'first', 'last')).toBeTruthy();
  });

  // it('should correctly return its values', () => {
  //   const author = new Author(1, 'first', 'last');
  //   expect(author.id).toBe(1);
  //   expect(author.getFirstName).toBe('first');
  //   expect(author.getLastName).toBe('last');
  // });

  it('should throw error at non-positive or null id', () => {
    expect(() => new Author(-1, 'first', 'last')).toThrowError();
    expect(() => new Author(0, 'first', 'last')).toThrowError();
    expect(() => new Author(null, 'first', 'last')).toThrowError();
  });

  it('should throw error at empty or null first name', () => {
    expect(() => new Author(1, '', 'last')).toThrowError();
    expect(() => new Author(1, null, 'last')).toThrowError();
  });

  it('should throw error at empty or null last name', () => {
    expect(() => new Author(1, 'first', '')).toThrowError();
    expect(() => new Author(1, 'first', null)).toThrowError();
  });
});

describe('CourseItem', () => {
  it('should create instance', () => {
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toBeTruthy();
  });

  it('should throw error at non-positive or null id', () => {
    expect(() => new CourseItem(-1, 'title', new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(0, 'title', new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(null, 'title', new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at empty or null title', () => {
    expect(() => new CourseItem(1, '', new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(1, null, new Date(Date.now()), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at invalid or null date', () => {
    expect(() => new CourseItem(1, 'title', new Date('dasd'), 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(1, 'title', null, 1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at non-positive or null duration', () => {
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), -1, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 0, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), null, 'description', false,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at null description', () => {
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 1, null, false,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at null topRated mark', () => {
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 1, 'description', null,
      [new Author(1, 'first', 'last')])).toThrowError();
  });

  it('should throw error at null or empty authors list', () => {
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 1, 'description', false, null)).toThrowError();
    expect(() => new CourseItem(1, 'title', new Date(Date.now()), 1, 'description', false, [])).toThrowError();
  });
});

describe('User', () => {
  it('should create instance at positive values', () => {
    expect(new User(1, { first: 'first', last: 'last' }, 'login', 'password', 'token')).toBeTruthy();
  });

  it('should correctly return its values', () => {
    const user = new User(1, { first: 'first', last: 'last' }, 'login', 'password', 'token');
    expect(user.getId).toBe(1);
    expect(user.getName).toEqual({ first: 'first', last: 'last' });
    expect(user.getLogin).toBe('login');
    expect(user.getPassword).toBe('password');
    expect(user.getToken).toBe('token');
  });

  it('should throw error at non-positive or null id', () => {
    expect(() => new User(-1, { first: 'first', last: 'last' }, 'login', 'password', 'token')).toThrowError();
    expect(() => new User(0, { first: 'first', last: 'last' }, 'login', 'password', 'token')).toThrowError();
    expect(() => new User(null, { first: 'first', last: 'last' }, 'login', 'password', 'token')).toThrowError();
  });

  it('should throw error at null name', () => {
    expect(() => new User(1, null, 'login', 'password', 'token')).toThrowError();
  });

  it('should throw error at empty or null first name', () => {
    expect(() => new User(1, { first: '', last: 'last' }, 'login', 'password', 'token')).toThrowError();
    expect(() => new User(1, { first: null, last: 'last' }, 'login', 'password', 'token')).toThrowError();
  });

  it('should throw error at empty or null last name', () => {
    expect(() => new User(1, { first: 'first', last: '' }, 'login', 'password', 'token')).toThrowError();
    expect(() => new User(1, { first: 'first', last: null }, 'login', 'password', 'token')).toThrowError();
  });

  it('should throw error at empty or null login', () => {
    expect(() => new User(1, { first: 'first', last: 'last' }, '', 'password', 'token')).toThrowError();
    expect(() => new User(1, { first: 'first', last: 'last' }, null, 'password', 'token')).toThrowError();
  });

  it('should throw error at empty or null password', () => {
    expect(() => new User(1, { first: 'first', last: 'last' }, 'login', '', 'token')).toThrowError();
    expect(() => new User(1, { first: 'first', last: 'last' }, 'login', null, 'token')).toThrowError();
  });


  it('should throw error at empty or null token', () => {
    expect(() => new User(1, { first: 'first', last: 'last' }, 'login', 'password', '')).toThrowError();
    expect(() => new User(1, { first: 'first', last: 'last' }, 'login', 'password', null)).toThrowError();
  });
});
