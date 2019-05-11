import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessagesService {

	constructor(private snackBar: MatSnackBar) {}

	show(message: string) {
	  this.snackBar.open(message, 'Zamknij', {
	    duration: 4000,
      verticalPosition: 'top',
      panelClass: 'rs-message-snack-bar'
    });
  }

}
