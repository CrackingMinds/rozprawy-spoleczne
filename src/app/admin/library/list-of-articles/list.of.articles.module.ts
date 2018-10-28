import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';

import { ListOfArticlesComponent } from 'app/admin/library/list-of-articles/list.of.articles.component';
import { AddArticleModule } from 'app/admin/library/add-article/add.article.module';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  ListOfArticlesComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,

    AddArticleModule,
    ArticleCardModule
  ],
  declarations: declarations,
  exports: declarations
})
export class ListOfArticlesModule {

}