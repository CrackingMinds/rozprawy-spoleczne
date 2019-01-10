import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule, MatMenuModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

import { ListOfIssuesComponent } from 'app/admin/pages/library/list-of-issues/list.of.issues.component';
import { IssueCrudComponent } from 'app/admin/pages/library/crud/issue-crud/issue.crud.component';

const declarations = [
  ListOfIssuesComponent,

  IssueCrudComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CustomPipesModule.forRoot(),

    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: declarations,
  exports: declarations,
  entryComponents: [
    IssueCrudComponent
  ]
})
export class ListOfIssuesModule {

}
