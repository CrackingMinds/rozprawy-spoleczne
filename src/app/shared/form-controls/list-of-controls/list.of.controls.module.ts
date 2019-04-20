import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';

import { ListOfControlsComponent } from 'app/shared/form-controls/list-of-controls/list.of.controls.component';
import { ListControlComponentFactory } from 'app/shared/form-controls/list-of-controls/control-factory/list.control.component.factory';

import { ModalModule } from 'app/admin/pages/library/modal/modal.module';

const declarations = [
  ListOfControlsComponent,
  ListControlComponentFactory
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,

    ModalModule.forRoot()
  ],
	declarations: declarations,
	exports: declarations
})
export class ListOfControlsModule {
}
