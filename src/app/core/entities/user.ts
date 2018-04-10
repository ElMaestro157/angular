export class User {
  constructor(
    private id: number,
    private name: {
      first: string,
      last: string
    },
    private login: string,
    private password: string,
    private token: string) {
    if (!id || id < 0) {
      throw new Error('Invalid id found!');
    }

    if (!name) {
      throw new Error('Invalid name object found!');
    }

    if (name && !name.first) {
      throw new Error('Invalid firstname found!');
    }

    if (name && !name.last) {
      throw new Error('Invalid lastname found!');
    }

    if (!login) {
      throw new Error('Invalid login found!');
    }

    if (!password) {
      throw new Error('Invalid password found!');
    }

    if (!token) {
      throw new Error('Invalid token found!');
    }
  }

  public get getId(): number {
    return this.id;
  }

  public get getName(): { first: string, last: string } {
    return this.name;
  }

  public get getLogin(): string {
    return this.login;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getToken(): string {
    return this.token;
  }

}
