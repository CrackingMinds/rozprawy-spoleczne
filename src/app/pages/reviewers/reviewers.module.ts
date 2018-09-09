import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material';

import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { ReviewersService } from 'app/pages/reviewers/reviewers.service';

const declarations = [
  ReviewersComponent
];

const providers = [
  ReviewersService
];

@NgModule({
  imports: [
    MatExpansionModule,
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
