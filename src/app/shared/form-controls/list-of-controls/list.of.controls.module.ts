import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule, MatButtonModule } from '@angular/material';

import { ListOfControlsComponent } from 'app/shared/form-controls/list-of-controls/list.of.controls.component';
import { ListControlComponentFactory } from 'app/shared/form-controls/list-of-controls/control-factory/list.control.component.factory';

const declarations = [
  ListOfControlsComponent,
  ListControlComponentFactory
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule
	],
	declarations: declarations,
	exports: declarations
})
export class ListOfControlsModule {
}
