import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleService } from 'app/pages/article/article.service';
import { ArticleComponent } from 'app/pages/article/article.component';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  ArticleComponent
];

const providers = [
  ArticleService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    ArticleCardModule,
    BasicWrapperModule.forRoot()
  ]
})
export class ArticleModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArticleModule,
      providers: providers
    };
  }

}
