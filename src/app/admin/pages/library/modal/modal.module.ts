import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { ModalComponent } from 'app/admin/pages/library/modal/modal.component';

const declarations = [
  ModalComponent
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

}
