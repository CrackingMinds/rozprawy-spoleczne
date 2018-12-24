import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule, MatIconModule } from '@angular/material';

import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { CommonModule } from '@angular/common';

import { IssueService } from 'app/services/endpoint/issue/issue.service';
import { FirestoreIssueService } from 'app/services/endpoint/issue/firestore.issue.service';

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
    {
      provide: IssueService,
      useClass: FirestoreIssueService
    }
  ]
})
export class ArchiveModule {

}
