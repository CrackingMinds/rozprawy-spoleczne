import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatExpansionModule, MatIconModule } from '@angular/material';

import { ArchiveComponent } from 'app/client/pages/archive/archive.component';
import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

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

    CustomPipesModule.forRoot()
  ],
  providers: [
  ]
})
export class ArchiveModule {

}
