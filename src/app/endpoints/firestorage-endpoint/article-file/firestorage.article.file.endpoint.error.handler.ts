import { Injectable } from '@angular/core';

@Injectable()
export class FirestorageArticleFileEndpointErrorHandler {

	constructor() {}

  handle(error): void {

    if (error.code === 'storage/unauthorized') {
      console.log('read-only access');
    }

  }

}
