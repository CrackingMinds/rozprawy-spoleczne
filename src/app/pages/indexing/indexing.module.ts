import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexingComponent } from 'app/pages/indexing/indexing.component';

const declarations = [
  IndexingComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class IndexingModule {
}
