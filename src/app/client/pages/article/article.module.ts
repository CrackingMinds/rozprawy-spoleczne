import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleComponent } from 'app/client/pages/article/article.component';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  ArticleComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    ArticleCardModule
  ]
})
export class ArticleModule {
}
