import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';

import { ListOfControlsModule } from 'app/shared/form-controls/list-of-controls/list.of.controls.module';
import { ReviewerControlModule } from 'app/shared/form-controls/reviewer/reviewer.control.module';
import { ListOfReviewersComponent } from 'app/admin/pages/reviewers/list-of-reviewers/list.of.reviewers.component';

const declarations = [
  ListOfReviewersComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatButtonModule,

    ListOfControlsModule,
    ReviewerControlModule
	],
	declarations: declarations,
	exports: declarations
})
export class ListOfReviewersModule {
}
