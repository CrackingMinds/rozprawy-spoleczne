import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { ModalComponent } from 'app/admin/pages/library/modal/modal.component';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';

const declarations = [
  ModalComponent
];

const providers = [
  ModalService
];

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: declarations,
  exports: declarations,
  entryComponents: [
    ModalComponent
  ]
})
export class ModalModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: providers
    };
  }

}
