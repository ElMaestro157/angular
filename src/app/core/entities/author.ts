export class Author {
  constructor (
    private id: number,
    private firstName: string,
    private lastName: string
  ) {
    if (!id || id < 0) {
      throw new Error('Invalid id found!');
    }

    if (!firstName) {
      throw new Error('Invalid first name not found!');
    }

    if (!lastName) {
      throw new Error('Invalid last name not found!');
    }
  }

  public get getId(): number {
    return this.id;
  }

  public get getFirstName(): string {
    return this.firstName;
  }

  public get getLastName(): string {
    return this.lastName;
  }

  public static toDTO(value: any): Author {
    return new Author(value.id, value.firstName, value.lastName);
  }

  public static toServer(author: Author): any {
    return {
      id: author.getId,
      firstName: author.getFirstName,
      lastName: author.getLastName
    };
  }
}
