import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material';

import { MessagesService } from 'app/shared/messages/messages.service';

const externalProviders: Array<Provider> = [
  MessagesService
];

@NgModule({
	imports: [
		CommonModule,

    MatSnackBarModule
	]
})
export class MessagesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessagesModule,
      providers: externalProviders
    };
  }

}
