import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { issuePageReducers } from 'app/client/pages/issue/store/issue.page.reducers';
import { issuePageEffects } from 'app/client/pages/issue/store/issue.page.effects';

import { IssueComponent } from 'app/client/pages/issue/issue.component';

import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';
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

    StoreModule.forFeature('issuePage', issuePageReducers),
    EffectsModule.forFeature(issuePageEffects),

    CustomPipesModule.forRoot(),
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
