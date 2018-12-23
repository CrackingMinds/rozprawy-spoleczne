import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleComponent } from 'app/pages/article/article.component';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  ArticleComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    ArticleCardModule,
    BasicWrapperModule.forRoot()
  ]
})
export class ArticleModule {
}
