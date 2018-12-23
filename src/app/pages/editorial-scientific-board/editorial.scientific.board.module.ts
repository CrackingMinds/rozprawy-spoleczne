import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  EditorialScientificBoardComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot()
  ]
})
export class EditorialScientificBoardModule {
}
