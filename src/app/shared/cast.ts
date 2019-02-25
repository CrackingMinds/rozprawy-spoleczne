import { Person } from 'app/models/person';

export class Cast {

  static toPerson(value: any): Person {
    return {
      firstName: value.firstName === "" ? null : value.firstName,
      lastName: value.lastName === "" ? null : value.lastName,
      middleName: value.middleName === "" ? null : value.middleName
    };
  }

}
