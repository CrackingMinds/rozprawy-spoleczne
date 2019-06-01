import { Person } from 'app/models/person';

export class Cast {

  static toPerson(value: any): Person {
    if (!value)
      return null;

    return {
      firstName: value.firstName === "" ? null : value.firstName,
      lastName: value.lastName === "" ? null : value.lastName,
      middleName: value.middleName === "" ? null : value.middleName
    };
  }

}
