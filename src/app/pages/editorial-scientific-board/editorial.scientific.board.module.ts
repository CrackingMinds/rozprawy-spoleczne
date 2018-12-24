import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';

const declarations = [
  EditorialScientificBoardComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class EditorialScientificBoardModule {
}
