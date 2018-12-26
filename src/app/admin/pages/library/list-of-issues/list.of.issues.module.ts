import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule, MatMenuModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

import { ListOfIssuesComponent } from 'app/admin/pages/library/list-of-issues/list.of.issues.component';
import { IssueCRUDModalComponent } from 'app/admin/pages/library/list-of-issues/modals/create-issue/issue.crud.modal.component';

const declarations = [
  ListOfIssuesComponent,

  IssueCRUDModalComponent
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
    IssueCRUDModalComponent
  ]
})
export class ListOfIssuesModule {

}
