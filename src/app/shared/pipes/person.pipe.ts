import { Pipe, PipeTransform } from '@angular/core';

import { Person } from 'app/models/person';

@Pipe({
  name: 'person'
})
export class PersonPipe implements PipeTransform {

  transform(person: Person): string {

    let result = `${person.firstName} `;

    if (person.middleName) {
      result += `${person.middleName} `;
    }

    result += person.lastName;

    return result;
  }

}
