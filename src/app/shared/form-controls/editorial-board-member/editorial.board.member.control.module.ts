import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { PersonControlModule } from 'app/shared/form-controls/person-control/person.control.module';
import { EditorialBoardMemberControlComponent } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.component';

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
	exports: declarations,
  entryComponents: [
    EditorialBoardMemberControlComponent
  ]
})
export class EditorialBoardMemberControlModule {
}
