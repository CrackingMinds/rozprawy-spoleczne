import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatMenuModule } from '@angular/material';

import { ArticlesComponent } from 'app/admin/articles/articles.component';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  ArticlesComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    MatIconModule,
    MatMenuModule,

    ArticleCardModule
  ]
})
export class ArticlesModule {

}
