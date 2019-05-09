import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class EndpointErrorHandler {

	constructor() {}

  handle(error): Observable<any> {

    if (error.code === 'permission-denied') {
      console.log('read-only access');
      return of(null);
    } else {
      return throwError(error);
    }

  }

}
