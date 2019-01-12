import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material';

import { ReviewersComponent } from 'app/client/pages/reviewers/reviewers.component';
import { CommonModule } from '@angular/common';

const declarations = [
  ReviewersComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule
  ],
  declarations: declarations,
  exports: declarations,
})
export class ReviewersModule {
}
