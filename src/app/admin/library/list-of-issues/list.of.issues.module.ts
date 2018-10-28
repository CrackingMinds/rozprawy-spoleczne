import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatMenuModule } from '@angular/material';

import { ListOfIssuesComponent } from 'app/admin/library/list-of-issues/list.of.issues.component';

const declarations = [
  ListOfIssuesComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatMenuModule
  ],
  declarations: declarations,
  exports: declarations
})
export class ListOfIssuesModule {

}
