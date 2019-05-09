import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { MessagesService } from 'app/shared/messages/messages.service';
import { ANONYMOUS_READ_ONLY_ACCESS } from 'app/shared/messages/messages';

@Injectable()
export class EndpointErrorHandler {

	constructor(private readonly messagesService: MessagesService) {}

  handle(error): Observable<any> {

    if (error.code === 'permission-denied') {
      this.messagesService.show(ANONYMOUS_READ_ONLY_ACCESS);
      return of(null);
    } else {
      return throwError(error);
    }

  }

}
