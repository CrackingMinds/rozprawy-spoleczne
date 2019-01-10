import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatCardModule } from '@angular/material';

import { ListOfArticlesComponent } from 'app/admin/pages/library/list-of-articles/list.of.articles.component';
import { ArticleCrudModule } from 'app/admin/pages/library/crud/article-crud/article.crud.module';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  ListOfArticlesComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatCardModule,

    ArticleCrudModule,
    ArticleCardModule
  ],
  declarations: declarations,
  exports: declarations
})
export class ListOfArticlesModule {

}
