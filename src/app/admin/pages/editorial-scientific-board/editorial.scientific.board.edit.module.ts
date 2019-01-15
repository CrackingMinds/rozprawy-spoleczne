import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EditorialScientificBoardEditComponent } from 'app/admin/pages/editorial-scientific-board/editorial.scientific.board.edit.component';

const declarations = [
  EditorialScientificBoardEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    RouterModule.forChild([{
      path: '',
      component: EditorialScientificBoardEditComponent
    }])
	],
	declarations: declarations,
	exports: declarations
})
export class EditorialScientificBoardEditModule {
}
