import { Pipe, PipeTransform } from '@angular/core';

import { Author } from 'app/models/author';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(author: Author): string {

    let result = `${author.firstName} `;

    if (author.middleName) {
      result += `${author.middleName} `;
    }

    result += author.lastName;

    return result;
  }

}
