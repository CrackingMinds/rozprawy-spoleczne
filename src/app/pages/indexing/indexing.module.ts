import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexingComponent } from 'app/pages/indexing/indexing.component';
import { IndexingService } from 'app/pages/indexing/indexing.service';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  IndexingComponent
];

const providers = [
  IndexingService
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
export class IndexingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IndexingModule,
      providers: providers
    };
  }
}
