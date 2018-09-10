import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueComponent } from 'app/pages/issue/issue.component';
import { IssueService } from 'app/pages/issue/issue.service';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';
import { ArticleCardModule } from 'app/shared/templates/article-card/article.card.module';

const declarations = [
  IssueComponent
];

const providers = [
  IssueService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot(),
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
