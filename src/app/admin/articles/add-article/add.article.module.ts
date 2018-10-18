import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AddArticleFormComponent } from 'app/admin/articles/add-article/add.article.component';
import { SelectArticleTypeModule } from 'app/admin/articles/modules/select-article-type/select.article.type.module';
import { AddAuthorsModule } from 'app/admin/articles/modules/add-authors/add.authors.module';
import { ToggleAreaModule } from 'app/admin/articles/modules/toggle-area/toggle.area.module';
import { UploadArticleModule } from 'app/admin/articles/modules/upload-article/upload.article.module';

const declarations = [
  AddArticleFormComponent
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

    SelectArticleTypeModule.forRoot(),
    AddAuthorsModule.forRoot(),
    ToggleAreaModule.forRoot(),
    UploadArticleModule.forRoot()
  ]
})
export class AddArticleModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AddArticleModule,
      providers: providers
    };
  }

}
