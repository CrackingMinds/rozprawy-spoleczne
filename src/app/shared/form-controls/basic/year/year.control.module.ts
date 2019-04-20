import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { YearControlComponent } from 'app/shared/form-controls/basic/year/year.control.component';

const declarations = [
  YearControlComponent
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
export class YearControlModule {
}
