import { NgModule, Provider, ModuleWithProviders } from '@angular/core';

import { FirestorageArticleFileEndpointErrorHandler } from 'app/endpoints/firestorage-endpoint/article-file/firestorage.article.file.endpoint.error.handler';

import { ArticleFileEndpoint } from 'app/endpoints/endpoint/article-file/article.file.endpoint';
import { FirestorageArticleFileEndpoint } from 'app/endpoints/firestorage-endpoint/article-file/firestorage.article.file.endpoint';

const externalProviders: Array<Provider> = [
  FirestorageArticleFileEndpointErrorHandler,
  {
    provide: ArticleFileEndpoint,
    useClass: FirestorageArticleFileEndpoint
  }
];

@NgModule({})
export class FirestorageArticleFileEndpointModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirestorageArticleFileEndpointModule,
      providers: externalProviders
    };
  }

}
