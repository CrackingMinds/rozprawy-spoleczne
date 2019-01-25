import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonControlModule } from 'app/shared/form-controls/person-control/person.control.module';
import { EditorialBoardMemberControlComponent } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [
  EditorialBoardMemberControlComponent
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
	exports: declarations
})
export class EditorialBoardMemberControlModule {
}
