import { Injectable } from '@angular/core';

import { MessagesService } from 'app/shared/messages/messages.service';
import { ANONYMOUS_READ_ONLY_ACCESS } from 'app/shared/messages/messages';

@Injectable()
export class FirestorageArticleFileEndpointErrorHandler {

	constructor(private readonly messagesService: MessagesService) {}

  handle(error): void {

    if (error.code === 'storage/unauthorized') {
      this.messagesService.show(ANONYMOUS_READ_ONLY_ACCESS);
    }

  }

}
