import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { PersonControlModule } from 'app/shared/form-controls/person-control/person.control.module';

import { ReviewerControlComponent } from 'app/shared/form-controls/reviewer/reviewer.control.component';

const declarations = [
  ReviewerControlComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,

    PersonControlModule
	],
	declarations: declarations,
	exports: declarations,
  entryComponents: [
    ReviewerControlComponent
  ]
})
export class ReviewerControlModule {
}
