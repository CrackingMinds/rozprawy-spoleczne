import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatButtonModule } from '@angular/material';

import { SpinnerModule } from 'app/shared/templates/spinner/spinner.module';

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

    SpinnerModule
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
