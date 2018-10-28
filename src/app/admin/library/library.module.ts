import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatMenuModule } from '@angular/material';

import { LibraryComponent } from 'app/admin/library/library.component';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

import { ListOfIssuesModule } from 'app/admin/library/list-of-issues/list.of.issues.module';
import { ListOfArticlesModule } from 'app/admin/library/list-of-articles/list.of.articles.module';

const declarations = [
  LibraryComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    ArticleCardModule,

    ListOfIssuesModule,
    ListOfArticlesModule
  ],
  providers: providers
})
export class LibraryModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibraryModule,
      providers: providers
    };
  }

}
