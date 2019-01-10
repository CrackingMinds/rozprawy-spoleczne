import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatSelectModule } from '@angular/material';

import { SelectArticleTypeComponent } from 'app/admin/pages/library/crud/article-crud/controls/select-article-type/select.article.type.component';

const declarations = [
  SelectArticleTypeComponent
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
    MatSelectModule
  ]
})
export class SelectArticleTypeModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectArticleTypeModule,
      providers: providers
    };
  }

}
