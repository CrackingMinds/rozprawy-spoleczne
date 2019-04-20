import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReviewerYearDialogComponent } from 'app/admin/pages/reviewers/list-of-years/year-dialog/reviewer.year.dialog.component';
import { ModalModule } from 'app/admin/pages/library/modal/modal.module';
import { YearControlModule } from 'app/shared/form-controls/basic/year/year.control.module';

const declarations = [
  ReviewerYearDialogComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    YearControlModule,
    ModalModule.forRoot()
	],
	declarations: declarations,
	exports: declarations,
  entryComponents: [
    ReviewerYearDialogComponent
  ]
})
export class ReviewerYearDialogModule {
}
