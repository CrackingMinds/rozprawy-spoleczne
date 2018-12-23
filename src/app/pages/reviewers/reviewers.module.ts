import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material';

import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';
import { CommonModule } from '@angular/common';

const declarations = [
  ReviewersComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,

    BasicWrapperModule.forRoot()
  ],
  declarations: declarations,
  exports: declarations,
})
export class ReviewersModule {
}
