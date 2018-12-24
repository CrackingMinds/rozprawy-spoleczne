import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule, MatIconModule } from '@angular/material';

import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { CommonModule } from '@angular/common';

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
    MatIconModule
  ],
  providers: [
  ]
})
export class ArchiveModule {

}
