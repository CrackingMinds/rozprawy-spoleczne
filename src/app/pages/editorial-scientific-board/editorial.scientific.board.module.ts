import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';
import { EditorialScientificBoardService } from 'app/pages/editorial-scientific-board/editorial.scientific.board.service';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  EditorialScientificBoardComponent
];

const providers = [
  EditorialScientificBoardService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot()
  ]
})
export class EditorialScientificBoardModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditorialScientificBoardModule,
      providers: providers
    };
  }

}
