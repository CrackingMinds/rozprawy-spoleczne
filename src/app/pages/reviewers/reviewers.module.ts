import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material';

import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { ReviewersService } from 'app/pages/reviewers/reviewers.service';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';
import { CommonModule } from '@angular/common';

const declarations = [
  ReviewersComponent
];

const providers = [
  ReviewersService
];

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,

    BasicWrapperModule.forRoot()
  ],
  declarations: declarations,
  exports: declarations,
  providers: providers
})
export class ReviewersModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReviewersModule,
      providers: providers
    };
  }

}
