import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';

import { RODOComponent } from 'app/client/pages/rodo/rodo.component';

const declarations = [
  RODOComponent
];

@NgModule({
	imports: [
		CommonModule,

    MatIconModule
	],
	declarations: declarations,
	exports: declarations
})
export class RODOModule {
}
