import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';

import { ListOfYearsComponent } from 'app/admin/pages/reviewers/list-of-years/list.of.years.component';
import { ReviewerYearDialogModule } from 'app/admin/pages/reviewers/list-of-years/year-dialog/reviewer.year.dialog.module';

const declarations = [
  ListOfYearsComponent
];

@NgModule({
	imports: [
		CommonModule,

    MatIconModule,

    ReviewerYearDialogModule
	],
	declarations: declarations,
	exports: declarations
})
export class ListOfYearsModule {
}
