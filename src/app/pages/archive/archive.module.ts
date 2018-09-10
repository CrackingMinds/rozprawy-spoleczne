import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule, MatIconModule } from '@angular/material';

import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { CommonModule } from '@angular/common';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  ArchiveComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    RouterModule,

    MatExpansionModule,
    MatIconModule,

    BasicWrapperModule.forRoot()
  ]
})
export class ArchiveModule {

}
