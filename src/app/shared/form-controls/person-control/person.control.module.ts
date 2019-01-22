import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { PersonControlComponent } from 'app/shared/form-controls/person-control/person.control.component';

const declarations = [
  PersonControlComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule
	],
	declarations: declarations,
	exports: declarations
})
export class PersonControlModule {
}
