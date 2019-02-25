import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { PersonControlModule } from 'app/shared/form-controls/person-control/person.control.module';
import { ScientificBoardMemberControlComponent } from 'app/shared/form-controls/scientific-board-member/scientific.board.member.control.component';

const declarations = [
  ScientificBoardMemberControlComponent
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
    ScientificBoardMemberControlComponent
  ]
})
export class ScientificBoardMemberControlModule {
}
