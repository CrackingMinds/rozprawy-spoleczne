import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

import { EditorialScientificBoardComponent } from 'app/client/pages/editorial-scientific-board/editorial.scientific.board.component';

const declarations = [
  EditorialScientificBoardComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    CustomPipesModule
  ]
})
export class EditorialScientificBoardModule {
}
