import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { AddAuthorsComponent } from 'app/admin/pages/library/modules/add-authors/add.authors.component';

const declarations = [
  AddAuthorsComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddAuthorsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AddAuthorsModule,
      providers: providers
    };
  }
}
