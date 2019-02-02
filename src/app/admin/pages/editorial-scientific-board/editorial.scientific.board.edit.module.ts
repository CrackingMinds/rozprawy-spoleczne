import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material';

import { EditorialScientificBoardEditComponent } from 'app/admin/pages/editorial-scientific-board/editorial.scientific.board.edit.component';

import { ListOfControlsModule } from 'app/shared/form-controls/list-of-controls/list.of.controls.module';
import { EditorialBoardMemberControlModule } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.module';

const declarations = [
  EditorialScientificBoardEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: EditorialScientificBoardEditComponent
    }]),

    MatIconModule,

    ListOfControlsModule,
    EditorialBoardMemberControlModule
	],
	declarations: declarations,
	exports: declarations
})
export class EditorialScientificBoardEditModule {
}
