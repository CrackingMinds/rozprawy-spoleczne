import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexingComponent } from 'app/pages/indexing/indexing.component';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  IndexingComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot()
  ]
})
export class IndexingModule {
}
