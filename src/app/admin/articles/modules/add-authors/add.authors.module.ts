import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { AddAuthorsComponent } from 'app/admin/articles/modules/add-authors/add.authors.component';

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
