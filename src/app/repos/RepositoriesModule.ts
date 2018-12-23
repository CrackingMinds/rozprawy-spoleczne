import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRepository } from 'app/repos/articles.repository';
import { NgrxArticlesRepository } from 'app/repos/ngrx/articles/articles.repository';

import { IssuesRepository } from 'app/repos/issues.repository';
import { NgrxIssuesRepository } from 'app/repos/ngrx/issues/ngrx.issues.repository';

const providers = [
  { provide: ArticlesRepository, useClass: NgrxArticlesRepository },
  { provide: IssuesRepository, useClass: NgrxIssuesRepository }
];

@NgModule({
	imports: [
		CommonModule
	],
	providers: providers
})
export class RepositoriesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RepositoriesModule,
      providers: providers
    };
  }

}
