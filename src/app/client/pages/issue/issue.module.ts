import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueComponent } from 'app/client/pages/issue/issue.component';

import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';
import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

const declarations = [
  IssueComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    CustomPipesModule.forRoot(),
    ArticleCardModule
  ]
})
export class IssueModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IssueModule,
      providers: providers
    };
  }

}
