import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ArticleCrudComponent } from 'app/admin/pages/library/crud/article-crud/article.crud.component';
import { SelectArticleTypeModule } from 'app/admin/pages/library/crud/article-crud/controls/select-article-type/select.article.type.module';
import { AddAuthorsModule } from 'app/admin/pages/library/crud/article-crud/controls/add-authors/add.authors.module';
import { ToggleAreaModule } from 'app/admin/pages/library/crud/article-crud/controls/toggle-area/toggle.area.module';
import { UploadArticleModule } from 'app/admin/pages/library/crud/article-crud/controls/upload-article/upload.article.module';

const declarations = [
  ArticleCrudComponent
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
  ],
  entryComponents: [
    ArticleCrudComponent
  ]
})
export class ArticleCrudModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArticleCrudModule,
      providers: providers
    };
  }

}
