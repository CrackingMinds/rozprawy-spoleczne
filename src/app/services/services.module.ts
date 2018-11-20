import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleTypesService } from 'app/services/crud/article.types.service';
import { IssueService } from 'app/client/pages/issue/issue.service';
import { ArticleService } from 'app/admin/library/add-article/article.service';

import { PageNameService } from 'app/shared/services/page.name.service';

import { ApiService } from 'app/services/api.service';

const providers = [
  ApiService,

  ArticleService,
  ArticleTypesService,
  IssueService,

  PageNameService
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: providers
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: providers
    };
  }

}
