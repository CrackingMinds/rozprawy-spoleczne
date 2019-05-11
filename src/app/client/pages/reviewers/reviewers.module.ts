import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material';

import { SpinnerModule } from 'app/shared/templates/spinner/spinner.module';

import { ReviewersComponent } from 'app/client/pages/reviewers/reviewers.component';

const declarations = [
  ReviewersComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,

    SpinnerModule
  ],
  declarations: declarations,
  exports: declarations,
})
export class ReviewersModule {
}
