import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatCardModule } from '@angular/material';

import { ListOfArticlesComponent } from 'app/admin/pages/library/list-of-articles/list.of.articles.component';
import { AddArticleModule } from 'app/admin/pages/library/add-article/add.article.module';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  ListOfArticlesComponent
];

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatCardModule,

    AddArticleModule,
    ArticleCardModule
  ],
  declarations: declarations,
  exports: declarations
})
export class ListOfArticlesModule {

}
